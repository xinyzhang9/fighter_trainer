//38 up, 40  down, 37 left, 39 right
$(function () {
    var action1 = [40,37,40,39,65];
    var action2 = [40,39,40,39,68];
    var konami1 = Rx.Observable.fromArray(action1);
    var konami2 = Rx.Observable.fromArray(action2);
    var result = $('#result');

    function activeKey(c){
        var key = $('#k'+c);
        key.addClass('active');
            setTimeout(function(){
                 key.removeClass('active');
            },200);
    }

    // activate key on keyboard
    $(document).keyupAsObservable()
        .map(function (e) { return e.keyCode; })
        .subscribe(
            function (x) {
            console.log(x);
            activeKey(x);
          }
        );

    // action1
    $(document).keyupAsObservable()
        .map(function(e){ return e.keyCode; })
        .windowWithCount(5,1)
        .selectMany(function(x){
            return x.sequenceEqual(konami1);
        })
        .filter(function(equal){return equal; })
        .subscribe(function(){
            result.html("<image src = 'action1.gif' />").show().fadeOut(8000);
            activeKey(0);
        })

    // action2
    $(document).keyupAsObservable()
        .map(function (e) { return e.keyCode; }) // get the key code
        .windowWithCount(5, 1)                     // get the last 10 keys
        .selectMany(function (x) {                  // compare to known konami code sequence
            return x.sequenceEqual(konami2);
        })
        .filter(function (equal) { return equal; })  // where we match
        .subscribe(function () {
            result.html("<image src = 'action2.gif' />").show().fadeOut(4300);   // print the result
        });
});
