import GuestPostingSettings from './components/GuestPostingSettings';

app.initializers.add('block-cat/guest-posting', () => {
  app.extensionData.for('block-cat-guest-posting')
    .registerPage(GuestPostingSettings);
});
