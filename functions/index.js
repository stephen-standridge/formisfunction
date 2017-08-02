const functions = require('firebase-functions');
const SparkPost = require('sparkpost');
const apiKey = functions.config().sparkpost.api_key;
const client = new SparkPost(apiKey);

exports.updateMailingList = functions.database.ref('/subscriptions')
  .onWrite((event) => {
    if (event.data.changed()) {
      const listId = functions.config().sparkpost.recipient_list;
      const listName = functions.config().sparkpost.recipient_list_name;
      const currentList = event.data.current.toJSON();
      const newList = currentList && Object.keys(currentList) || [];
      const recipientList = {
        id: listId,
        name: listName,
        recipients: newList.map((email) => {
          return { address: { email: decodeURIComponent(email) }}
        })
      };
      // Promise
      return client.recipientLists.update(listId, recipientList).then(data => {
          console.log(data);
        }).catch(err => {
          console.log(err);
        });
    }
  });
