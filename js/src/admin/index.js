import GuestPostingSettings from './components/GuestPostingSettings';
import {extend} from 'flarum/extend';  
import PermissionGrid from 'flarum/components/PermissionGrid';

app.initializers.add('block-cat/guest-posting', () => {
  extend(PermissionGrid.prototype, 'startItems', (items) => {
    items.replace(
      'start',
      {
        icon: 'fas fa-edit',
        label: app.translator.trans('core.admin.permissions.start_discussions_label'),
        permission: 'startDiscussion',
        allowGuest: true,
      },
      100
    );
  });
  app.extensionData.for('block-cat-guest-posting')
    .registerPage(GuestPostingSettings);
});
