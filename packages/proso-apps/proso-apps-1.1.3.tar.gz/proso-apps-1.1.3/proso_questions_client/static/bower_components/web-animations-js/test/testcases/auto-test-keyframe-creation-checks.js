timing_test(function() {
  at(0 * 1000, function() {
    assert_styles(
      '.anim',
      [{'left':'50px'},
       {'left':'50px'},
       {'left':'100px'},
       {'left':'50px'},
       {'left':'100px'},
       {'left':'200px'},
       {'left':'200px'}]);
    }, "Autogenerated");
  at(0.4 * 1000, function() {
    assert_styles(
      '.anim',
      [{'left':'50px'},
       {'left':'50px'},
       {'left':'120px'},
       {'left':'80px'},
       {'left':'120px'},
       {'left':'120px'},
       {'left':'360px'}]);
    }, "Autogenerated");
  at(0.8 * 1000, function() {
    assert_styles(
      '.anim',
      [{'left':'50px'},
       {'left':'50px'},
       {'left':'140px'},
       {'left':'110px'},
       {'left':'140px'},
       {'left':'120px'},
       {'left':'340px'}]);
    }, "Autogenerated");
  at(1.2000000000000002 * 1000, function() {
    assert_styles(
      '.anim',
      [{'left':'120px'},
       {'left':'80px'},
       {'left':'160px'},
       {'left':'140px'},
       {'left':'160px'},
       {'left':'146.6666717529297px'},
       {'left':'340px'}]);
    }, "Autogenerated");
  at(1.6 * 1000, function() {
    assert_styles(
      '.anim',
      [{'left':'160px'},
       {'left':'140px'},
       {'left':'180px'},
       {'left':'170px'},
       {'left':'180px'},
       {'left':'173.3333282470703px'},
       {'left':'360px'}]);
    }, "Autogenerated");
  at(2 * 1000, function() {
    assert_styles(
      '.anim',
      {'left':'200px'});
    }, "Autogenerated");
  at(2.4 * 1000, function() {
    assert_styles(
      '.anim',
      {'left':'200px'});
    }, "Autogenerated");
}, "Autogenerated checks.");
