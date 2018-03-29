define(
  function()
  {
    var ArticleViewModel = function(params)
    {
      this.dataPromise = params['dataPromise'];


      this.handleActivated = function()
      {
        // Returning the Promise will delay attaching of the View until the Promise is resolved
        // We can reference 'this.' here because all ojModule convention methods are invoked with 'this'
        // pointing to the ViewModel instance
        return this.dataPromise;
      };

      var self = this;

      this.dataPromise.then(
        function(data)
        {

          var sitesHost = "http://localhost:8003/"; // da aggiungere se non si usano i vanity URL
          var article = {};
          var articleObject = data[data['start']];
          var relatedImage = data[articleObject.relatedImage.type+":"+articleObject.relatedImage.id];

          article.title = articleObject['name'];
          article.headline = articleObject['headline'];
          article.abstract = articleObject['abstract'];
          article.body = articleObject['body'];
          article.originalImage = relatedImage.imageFile_bloblink_;
          article.largeThumbnail = relatedImage.largeThumbnail_bloblink_;
          article.smallThumbnail = relatedImage.smallThumbnail_bloblink_;

          self.articleInfo = article;
        }
      );

    };

    return ArticleViewModel;
  }
);
