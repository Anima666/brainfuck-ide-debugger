var uid;
var filename;
debug_toggle();
$("#savebtn").hide();

var data = [{
  filename: '',
  content: ''
}]

var file = {
  filename: 'filename',
  content: 'content'
}

var timerId = setInterval(function() {
  if (filename != null) {
    savecurrentfile();
  }
}, 2000);

loadfio();

function loadfio() {
  uid = getdata('uid');
  fio = getdata('fio');
  $("#fio").text(fio + " |  ");
}

function Authorization(token) {
  filename = null;
  $("#btn").children().remove();
  $.getJSON("//ulogin.ru/token.php?host=" + encodeURIComponent(location.toString()) + "&token=" + token + "&callback=?",
    function(data) {
      data = $.parseJSON(data.toString());
      if (!data.error) {
        //  if (getdata('uid') == null) {
        var fio = data.first_name + " " + data.last_name;
        uid = data.uid;
        console.log('uid - ' + uid);

        savedata('uid', uid);
        savedata('fio', fio);

        if (getdata(uid) == null) {
          savedata(uid, uid);
          savedata('fio', fio);

          console.log('first auth');

          var files = [{
            filename: 'helloWord0',
            content: '++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.'
          }]

          savedata(uid, files);
        }

        $("#fio").text(fio);
        //  loadfio();

        data = getdata(uid);

        createbtns();

        //console.log("buttons has created");
        //  file.filename = "helloWord0";
        //file.content = "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.";
        //  data.push(file);
      }
    });

}

data = getdata(uid);

if ((data != null) && (uid != "")) {
  createbtns();
}

function processdata(id) {

  if (data == null) {
    var id_file = 0;
  } else {
    id_file = data.length;
  }

  file.filename = 'file' + id_file;
  file.content = document.getElementById(id).value;

  data.push(file);
  savedata(uid, data);

  data = getdata(uid);
  createbtn(file);

}

function getdata(key) {
  return JSON.parse(localStorage.getItem(key));
}

function savedata(key, obj) {
  var serialObj = JSON.stringify(obj);
  localStorage.setItem(key, serialObj);
}

function savecurrentfile() {
  try {
    data[findfileindex(filename)].content = $("#edit_source").val();
    //console.log(data[findfileindex(filename)].content);
    savedata(uid, data);
    console.log('succes save')
  } catch (err) {
    //alert("you dont select file");
    console.log(err);
  }
}

function createbtns() {
  if (data != null)
    for (var i = 0; i < data.length; i++) {
      createbtn(data[i]);
    }
}

function createbtn(file) {
  $('<input>', {
    type: "text",
    value: file.filename,
    readOnly: true,
    class: 'form-control'

  }).appendTo('#btn');
}

function newfile() {
  try {
    filename = 'file' + getRndInteger(0, 99999) + 1;
    var file2 = {
      filename: filename,
      content: ""
    }

    data.push(file2);
    savedata(uid, data);

    createbtn(file2);
    console.log('newfile')
    $("#edit_source").val("");

  } catch (e) {
    console.log(e);
  }
}

function deletefile(file) {
  if (filename != null) {
    filename = null;
    data.splice(findfileindex(file), 1);
    $("#btn").children().remove()
    createbtns();
    savedata(uid, data);
  } else {
    alert("you dont select file")
  }
  //$(".button[text='" + filename1.filename + "']").remove();
}

function findfile(file) {
  return data[findfileindex(file)];
}

function findfileindex(file) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].filename == file) {
      return i;
    }
  }
}

$('#btn').on('click', '.form-control', function() {
  console.log("click");
  set_viewdata('progview', ' ');
  filename = this.value;
  var text = findfile(filename);
  if (text != null)
    $("#edit_source").val(text.content);
  $("#edit_output").val("");
})
$('#btn').on('dblclick', '.form-control', function() {
  console.log("dbclick");
  rename(this);
  filename = null;
})

var btnvalue;

function rename(obj) {
  console.log(obj);
  var btn = obj;
  if (btn.readOnly == true) {
    btnvalue = btn.value;
    $(btn).css("background-color", "red");
  }

  btn.readOnly = !btn.readOnly;

  if (btn.readOnly == true) {
    console.log(btn.value);
    data[findfileindex(btnvalue)].filename = btn.value;
    savedata(uid, data);
    $(btn).css("background-color", "white");
    $(btn).css("color", "black");
  }
}

$('.viewer').on('click', 'span', function(e) {
  var span = this;
  var idx = this.className;
  $('span[class=' + idx + '] input').val("");

  $('span[class=' + idx + '] input').keyup(function(event) {

    //if (event.keyCode === 13) {
      console.log('idx ' + idx);

      changeselemmemory(idx, parseInt(($(this).val()), 16));
      update_memview2();
      return;
    //}
  });
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function test() {
  newfile();
}

function showmemorypnl(title) {
  if (title.value == "Out") {
    $("#outputview").show();
    title.value = "Memory";
    return;
  }
  hidepanel('#outputview');
  title.value = "Out";
}

function hidepanel(idpnl) {
  $(idpnl).hide();
}

function showoutl() {
  $("#outputview").show();
}
