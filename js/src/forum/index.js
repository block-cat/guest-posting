import { override } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import DiscussionComposer from 'flarum/components/DiscussionComposer';
import Model from 'flarum/Model';
import LogInModal from 'flarum/components/LogInModal';
import GetEmailModal from './components/GetEmailModal';

app.initializers.add('block-cat/guest-posting', () => {
  override(IndexPage.prototype, 'newDiscussionAction', function(original) {
    return new Promise((resolve, reject) => {
      if (app.session.user) {
        app.composer.load(DiscussionComposer, { user: app.session.user });
        app.composer.show();

        return resolve(app.composer);
      } else {
        if (app.forum.attribute('block-cat.guestId') !== "") {
          const guestId = parseInt(app.forum.attribute('block-cat.guestId'));
          const guest = app.store.getById('users', guestId);
  
          app.composer.load(DiscussionComposer, { user: guest });
          app.composer.show();
  
          return resolve(app.composer);
        } else {
          app.modal.show(LogInModal);

          return reject();
        }
      }
    });
  });

  override(DiscussionComposer.prototype, 'onsubmit', function(original) {
    if (app.session.user) {
      original();
    } else {
      this.loading = true;

      const post = app.store.createRecord('discussions');
      const data = this.data();
      const guestData = {
        type: 'discussions',
        attributes: data,
      };

      if (data.relationships) {
        guestData.relationships = {};
  
        for (const key in data.relationships) {
          const model = data.relationships[key];
  
          guestData.relationships[key] = {
            data: model instanceof Array ? model.map(Model.getIdentifier) : Model.getIdentifier(model),
          };
        }
  
        delete data.relationships;
      }

      const guestId = parseInt(app.forum.attribute('block-cat.guestId'));
      const guest = app.store.getById('users', guestId);
      const guestUsername = guest.username();

      guestData.attributes.guest_email = this.composer.fields.email;

      return app
        .request(
          Object.assign(
            {
              method: 'POST',
              url: app.forum.attribute('apiUrl') + '/guest-post',
              body: { data: guestData, id: guestId, username: guestUsername },
            }
          )
        )
        .then((payload) => {
          post.store.data[payload.data.type] = post.store.data[payload.data.type] || {};
          post.store.data[payload.data.type][payload.data.id] = post;
          return post.store.pushPayload(payload);
        })
        .then(() => {
          this.composer.hide();
          app.discussions.refresh({ deferClear: true });
        }, this.loaded.bind(this))
        .catch((error) => {
          this.loading = false;
          m.redraw();
          throw error;
      });
    }
  });
  override(DiscussionComposer.prototype, 'onsubmit', function(original) {
    if (app.session.user) {
      original();
    } else {
      var email = '';
      app.modal.show(GetEmailModal, {
        email: email,
        onsubmit: email => {
          this.composer.fields.email = email;
          original();
        }
      })
    }
  });
},
1);