from django.core.management.base import BaseCommand, CommandError
from jsonschema import validate
from proso_configab.models import Experiment, Variable, PossibleValue
from datetime import datetime
from django.db import transaction
import os
import json


class Command(BaseCommand):

    def handle(self, *args, **options):
        with open(os.path.join(os.path.dirname(os.path.realpath(__file__)), "experiments_schema.json"), "r") as schema_file:
            schema = json.load(schema_file, 'utf-8')
        if len(args) < 1:
            raise CommandError(
                "Not enough arguments. One argument required: " +
                " <file> JSON file containing questions")
        with open(args[0], 'r') as json_file:
            with transaction.atomic():
                data = json.load(json_file, 'utf-8')
                validate(data, schema)
                self._load_experiments(data["experiments"])

    def _load_experiments(self, data):
        for experiment in data:
            experiment_db, created = Experiment.objects.get_or_create(identifier=experiment['id'])
            if 'paused' in experiment and experiment['paused'] != experiment_db.is_paused:
                experiment_db.is_paused = experiment['paused']
                experiment_db.save()
                print ' -- experiment', experiment['id'], ('paused' if experiment['paused'] else 'unpaused')
            if 'disabled' in experiment:
                if not experiment_db.is_enabled:
                    if not experiment['disabled']:
                        raise CommandError('Experiment "{}" can not be enabled again.'.format(experiment['id']))
                elif experiment['disabled']:
                    experiment_db.is_enabled = False
                    experiment_db.time_disabled = datetime.now()
                    experiment_db.save()
                    print ' -- experiment', experiment['id'], 'disabled'

            if not created:
                print ' -- experiment', experiment['id'], 'already created, skipping'
                continue
            for variable in experiment['variables']:
                variable_db, _ = Variable.objects.get_or_create(app_name=variable['app_name'], name=variable['name'])
                prob_sum = sum(map(lambda val: val['probability'], variable['values']))
                if prob_sum != 100:
                    raise CommandError('The total sum of probs for variable "{}.{}" is {}, expected 100'.format(variable['app_name'], variable['name'], prob_sum))
                for value in variable['values']:
                    PossibleValue.objects.create(
                        experiment=experiment_db,
                        variable=variable_db,
                        value=value['value'],
                        probability=value['probability'],
                    )
            print ' -- experiment', experiment['id'], 'created'
        enabled_experiments = Experiment.objects.filter(is_enabled=True).count()
        if enabled_experiments > 1:
            raise CommandError('Number of enabled experiments is not allowed to be larger than 1, found {}'.format(enabled_experiments))
