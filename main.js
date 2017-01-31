//38 up, 40  down, 37 left, 39 right
$(function () {
    var action1 = [40,37,40,39,65];
    var action2 = [40,39,40,39,68];
    var action3 = [38,37,38,39,65];
    var konami1 = Rx.Observable.fromArray(action1);
    var konami2 = Rx.Observable.fromArray(action2);
    var konami3 = Rx.Observable.fromArray(action3);
    var result = $('#result');
    var recentKeysDOM = $('#recentKeysDOM');
    var caps_state = $('#dot');
    var recentKeys = [];
    var capslock = false;
    var map = new Map();

    function init(){
        map.set(27,'Esc');
        map.set(48,'0');
        map.set(49,'1');
        map.set(50,'2');
        map.set(51,'3');
        map.set(52,'4');
        map.set(53,'5');
        map.set(54,'6');
        map.set(55,'7');
        map.set(56,'8');
        map.set(57,'9');
        map.set(192,'~');
        map.set(189,'-');
        map.set(187,'+');
        map.set(8,'Del');
        map.set(219,'{');
        map.set(221,'}');
        map.set(220,'|');
        map.set(20,'Cap');
        map.set(186,':');
        map.set(222,'"');
        map.set(13,'Enter');
        map.set(16,'Shift');
        map.set(188,'<');
        map.set(190,'>');
        map.set(191,'?');
        map.set(17,'Ctrl');
        map.set(18,'Alt');
        map.set(91,'Command');
        map.set(93,'Command');
        map.set(32,'Space');
        map.set(37,'&#9664;');
        map.set(38,'&#9650;');
        map.set(39,'&#9654;');
        map.set(40,'&#9660;');
        map.set(65,'A');
        map.set(66,'B');
        map.set(67,'C');
        map.set(68,'D');
        map.set(69,'E');
        map.set(70,'F');
        map.set(71,'G');
        map.set(72,'H');
        map.set(73,'I');
        map.set(74,'J');
        map.set(75,'K');
        map.set(76,'L');
        map.set(77,'M');
        map.set(78,'N');
        map.set(79,'O');
        map.set(80,'P');
        map.set(81,'Q');
        map.set(82,'R');
        map.set(83,'S');
        map.set(84,'T');
        map.set(85,'U');
        map.set(86,'V');
        map.set(87,'W');
        map.set(88,'X');
        map.set(89,'Y');
        map.set(90,'Z');
    }

    function keyToChar(key){
        return map.get(key);
    }

    function activeKey(c){
        var key = $('#k'+c);
        key.addClass('active');
            setTimeout(function(){
                 key.removeClass('active');
            },200);
    }

    function renderKeys(arr){
        return arr.map(function(x){
            return `<kbd class="keyboard-key nowrap">${keyToChar(x)}</kbd>`
        })
    }

    init();

    // activate key on keyboard
    $(document).keyupAsObservable()
        .map(function (e) { return e.keyCode; })
        .subscribe(
            function (x) {
            // console.log(x);
            activeKey(x);
          }
        );

    // capslock
    $(document).keyupAsObservable()
        .map(function (e) { return e.keyCode; })
        .filter(function(x){ return x === 20; })
        .subscribe(
            function (x) {
                // activeKey(x);
                if(!capslock){
                    caps_state.addClass('capslock');
                    capslock = true;
                }else{
                    caps_state.removeClass('capslock');
                    capslock = false;
                }
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
            result.html("<image src = 'gif/action1.gif' />").show().fadeOut(8000);
            activeKey(0);
        })

    // action2
    $(document).keyupAsObservable()
        .map(function (e) { return e.keyCode; }) 
        .windowWithCount(5, 1)                    
        .selectMany(function (x) {                 
            return x.sequenceEqual(konami2);
        })
        .filter(function (equal) { return equal; }) 
        .subscribe(function () {
            result.html("<image src = 'gif/action2.gif' />").show().fadeOut(4300);
        });

    // action3
    $(document).keyupAsObservable()
        .map(function (e) { return e.keyCode; }) 
        .windowWithCount(5, 1)                    
        .selectMany(function (x) {                 
            return x.sequenceEqual(konami3);
        })
        .filter(function (equal) { return equal; }) 
        .subscribe(function () {
            result.html("<image src = 'gif/action3.gif' />").show().fadeOut(2600);
        });

    // print last 10 keys
    $(document).keyupAsObservable()
        .map(function (e) { return e.keyCode; })                     
        .subscribe(function (x) {
            if(recentKeys.length >= 10){
                recentKeys.shift();
            }
            recentKeys.push(x);
            var res = renderKeys(recentKeys);
            recentKeysDOM.html(res).show().fadeOut(2000);
        });


});
