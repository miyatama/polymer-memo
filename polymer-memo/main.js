function initializeOrenoMaterial(){
  document.querySelector('body').addEventListener(
    "core-header-panel-ex-scroll"
    ,onCoreHeaderPanelExScroll
    ,false);
}

function onCoreHeaderPanelExScroll(event) {

  document.querySelector('paper-fab-ex').classList.toggle(
    'tall'
    ,document.querySelector('.maintoolbar').classList.contains('tall'));

  document.querySelector('paper-fab-ex').classList.toggle(
    'mini'
    ,!document.querySelector('.maintoolbar').classList.contains('tall'));
}

function onBodyClick(e){
  var t = e.target;
  if (t.localName === 'paper-icon-button') {
    if (!t.hasAttribute('disabled')) {
      onClickPaperIconButton(e);
    }
  }
}

function onClickPaperIconButton(e){
  var t = e.target;
  if( t.title == 'menu' ){
    var drawer = document.querySelector('core-drawer-panel');
    drawer.togglePanel(); 
  }
}

function onClickDrawermenubuttonAddmemo(e){
  var drawer = document.querySelector('core-drawer-panel');
  drawer.closeDrawer(); 
  var title = document.querySelector('.dialog_input_title');
  var memo = document.querySelector('.dialog_input_memo');
  title.value = "";
  memo.value = "";
  var dialog = document.querySelector(".dialog_add_memo");
  dialog.toggle();
}

function onClickDrawermenubuttonClearAll(e){
  $.ajax({
    type: "POST",
    url: "./service/removememo.php",
    data: {},
    success: function(data){
        if (data.succeed){
           //read memo list
           document.querySelector('memo-list').reload();
        }else{
           //show error message
           var toast = document.querySelector('.toast-message');
           toast.text = data.message;
           toast.show();
        }
      }
    });
  var drawer = document.querySelector('core-drawer-panel');
  drawer.closeDrawer(); 
}

function onClickDialogCancel(e){
  closeAddMemoDialog(e);
}

function closeAddMemoDialog(sender){
  var dialogElement = sender.parentElement;
  while(true){
    if( dialogElement.nodeName.toUpperCase() == 'PAPER-DIALOG'){
      break;
    }
    dialogElement = dialogElement.parentElement;
  }

  var undefined;
  //firefox‘Î‰ž
  if( dialogElement.close == undefined ){
    if(document.querySelector('core-overlay-layer').classList.contains('core-opened')){
      document.querySelector('core-overlay-layer').classList.remove('core-opened')
    }
  } else {
    dialogElement.close();
  }

}

function onClickDialogAddMemo(e){
  //submit memo dilaog
  var parameters = {
     "title":e.parentElement.querySelector('#dialog_input_title').value
     ,"memo":e.parentElement.querySelector('#dialog_input_memo').value
  };
  $.ajax({
    type: "POST",
    url: "./service/registmemo.php",
    data: parameters,
    success: function(data){
        if (data.succeed){
           /*
           var toast = document.querySelector('.toast-message');
           toast.text = "succeed!!";
           toast.show();
           */
           //read memo list
           document.querySelector('memo-list').reload();
           document.querySelector('core-header-panel-ex').scroller.scrollTop = 0;
        }else{
           //show error message
           var toast = document.querySelector('.toast-message');
           toast.text = data.message;
           toast.show();
        }
      }
    });
  closeAddMemoDialog(e);
}

