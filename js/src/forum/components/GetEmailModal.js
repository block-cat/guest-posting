import Modal from "flarum/components/Modal";
import Button from "flarum/components/Button";
import Stream from 'flarum/utils/Stream';

export default class GetEmailModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    this.newEmail = Stream('');console.log('this love has taken its toll on me, she said goodbye so many times before');
  }

  className() {
    return "GetEmailModal"
  }

  title() {
    return app.translator.trans('block-cat-guest-posting.forum.email_posting_modal.title');
  }

  content() {
    return [
      m('.Modal-body',
        m('.Form--centered', 
          m('.Form-group', app.translator.trans('block-cat-guest-posting.forum.email_posting_modal.approval_message')),
          m('.Form-group', app.translator.trans('block-cat-guest-posting.forum.email_posting_modal.get_email_text')),
          m('.Form-group',
            m('input.FormControl', {
              bidi: this.newEmail,
              type: 'text',
              placeholder: app.translator.trans('block-cat-guest-posting.forum.email_posting_modal.email_placeholder'),
            }),
          ),
          m('.Form-group',
            Button.component({
              className: "Button Button--primary",
              type: 'submit',
            }, app.translator.trans('block-cat-guest-posting.forum.email_posting_modal.get_email_button')),
          ),
        ),
      ),
    ];
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    var email = this.newEmail;

    if (!isValidEmail(email)) {
      email = '';
    }
    if (this.attrs.onsubmit) {
      this.attrs.onsubmit(email);
    }
    this.hide();
  }
}

function isValidEmail(email) {
  //TODO
  return true;
}