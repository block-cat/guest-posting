import ExtensionPage from 'flarum/common/components/ExtensionPage';
import app from 'flarum/app';
import saveSettings from 'flarum/utils/saveSettings';

export default class GuestPostingSettings extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);

    this.guestId = app.data.settings["block-cat.guest_id"];
  }

  content() {
    return [
      m('.ExtensionPage-settings', [
        m('.container', [
          m('Form', [
            m('.Form-group', [
              m('label', app.translator.trans('block-cat-guest-posting.admin.settings.guest_id_label')),
              m('.helpText', app.translator.trans('block-cat-guest-posting.admin.settings.guest_id_text', {min: 2, max: app.data.statistics.users.total})),
              m('input.FormControl', {
                type: 'number',
                placeholder: '2',
                min: 2,
                max: app.data.statistics.users.total,
                value: this.guestId,
                oninput: (e) => {
                  if (parseInt(e.target.value) < parseInt(e.target.min) || parseInt(e.target.value) > parseInt(e.target.max)) {
                    app.alerts.show({type: 'error'}, app.translator.trans('block-cat-guest-posting.admin.settings.guest_id_message'));
                    this.guestId = e.target.value;
                    saveSettings({["block-cat.guest_id"]: ''});
                  } else {
                    this.guestId = e.target.value;
                    saveSettings({["block-cat.guest_id"]: this.guestId});
                  }
                },
              })
            ]),
          ])
        ])
      ])
    ];
  }
}