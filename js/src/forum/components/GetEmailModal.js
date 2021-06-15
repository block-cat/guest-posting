import Modal from "flarum/components/Modal";
import Button from "flarum/components/Button";

export default class GetEmailModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
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
              type: 'text',
              placeholder: app.translator.trans('block-cat-guest-posting.forum.email_posting_modal.email_placeholder'),
            }),
          ),
          m('.Form-group',
            Button.component({
              className: "Button Button--primary",
            }, app.translator.trans('block-cat-guest-posting.forum.email_posting_modal.get_email_button')),
          ),
        ),
      ),
    ];
  }
}