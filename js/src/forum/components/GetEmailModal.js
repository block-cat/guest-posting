import Modal from "flarum/components/Modal";
import Button from "flarum/components/Button";

export default class GetEmailModal extends Modal {
  // remove 'x' button from modal
  // static isDismissible = false;
  
  oninit(vnode) {
    super.oninit(vnode);
  }

  className() {
    return "GetEmailModal"
  }

  title() {
    return app.translator.trans('Discutie postata');
  }

  content() {
    return [
      m('.Modal-body',
        m('.Form--centered', 
          m('.Form-group', 'Discutia Dvs. a fost trimisa catre aprobare. Multumim pentru contributie!'),
          m('.Form-group', 'Ati putea putea lasa o adresa de email pentru necesitate!'),
          m('.Form-group',
            m('input.FormControl', {
              type: 'text',
              placeholder: 'Email'
            }),
          ),
          m('.Form-group',
            Button.component({
              className: "Button Button--primary",
            }, 'Trimitere'),
          ),
        ),
      ),
    ];
  }
}