var r1 = ['hello', 'hi', 'yo', 'sup', 'whatsup', 'whats up', 'wud up', 'wag wan', 'hey'];
var a1 = ['HI!', 'Hello, how are you?', 'hello there', 'hello :)', 'hey!']


$(document).keypress(function(e) {
  var keycode = e.keyCode ? e.keyCode : e.which;
  if (keycode == "13" && $("p[contenteditable]").is(":focus")) {
    submit_text();
  }
});

$(".submit-chat").click(function() {
  submit_text();
});

function submit_text() {
  var val = $("p[contenteditable]").text();
  var time = new Date();
  time = addZero(time.getHours()) + ":" + addZero(time.getMinutes());
  $(".chat").append('<p class="self" data-time="' + time + '">' + val + "</p>");
  $("p[contenteditable]").empty();
  $(".chat").scrollTop($(".chat")[0].scrollHeight);


  if (r1.indexOf(val.toLowerCase()) >= 0) {
      //do something
      // gen value from 0 to 4
      setTimeout(function() {
        ralphRespond(a1[Math.floor(Math.random() * 4) + 0]);
      }, 1500);
  } else if ((val.toLowerCase()).includes("house") || (val.toLowerCase()).includes("housing") || (val.toLowerCase()).includes("place")){
    setTimeout(function() {
      ralphRespond("Oh! You are looking for housing? I have few recommendation!");
      setTimeout(function() {
        ralphRespond("2. Homeless Shelters: toro.to/homeless");
      }, 670);
      setTimeout(function() {
        ralphRespond("1. Community Housing: toro.to/communi");
      }, 450);
      setTimeout(function() {
        ralphRespond("3. Women Shelter: toro.to/womenHouse");
      }, 850);
    }, 1500);
  } else {
    ralphRespond("Honestly speaking, I am not perfect, sadly I do not know what you mean when you have said '" + val + "'")
  }
}

function addZero(v) {
  if (v <= 9) v = "0" + v;
  return v;
}

function ralphRespond(val) {
  var newVal = val;
  var newtime = new Date();
  newtime = addZero(newtime.getHours()) + ":" + addZero(newtime.getMinutes());
  $(".chat").append(
    '<p class="ralph" data-time="' + newtime + '">' + newVal + "</p>"
  );
  $(".chat").scrollTop($(".chat")[0].scrollHeight);
}
