
  require(['jquery', 'knockout', 'ojs/ojcore','ojs/ojknockout', 'ojs/ojmodule', 'promise'],

          function($, ko, oj)
          {
            function DynamicDataModuleModel()
            {
              // Starting with jQuery 1.8, jQuery's jqXHR object implements the Promise interface,
              // and that is what we are going to use to make ojModule wait for the fetch results.
              // However, jQuery does not pass the correct error to the fail callback on the Promise
              // (the jqXHR object is passed instead), so we will use jQuery's .fail() callback to
              // log the error appropriately
              var sitesHost = "http://localhost:8003";
              var baseURL = "/sites/REST/resources/v1";
              var searchURL = "/search/sites/Phantom/types/AVIArticle/assets"; // /search/sites/{siteName}/types/{assetType}/assets
              var articleURL = "/aggregates/Phantom/AVIArticle"; // /aggregates/{siteName}/{assetType}/{assetId}
              // La search ritorna un array con i risultati e gli URI per accedervi, eventualmente si può complicare l'esempio
              // mettendo prima la chiamata alla search per nome e poi la chiamata per la letturadei dettagli
              /*
              ...
              "items": [
                {
                  "name": "Article 1",
                    "link": {
                      "href": "http://localhost:8003/sites/REST/resources/v1/aggregates/Phantom/AVIArticle/1502442358841",
                      "rel": "assetReference",
                      "templated": false,
                      "mediaType": "",
                      "method": "GET",
                      "profile": ""
                    },
                    "description": "",
                    "id": "AVIArticle:1502442358841"
                }
              ]
              ...
              */
              // Il codice qui sotto ricava lo URI della risorsa cercata
              /*
              var jqXHR1 = $.getJSON("http://localhost:8003/sites/REST/resources/v1/search/sites/Phantom/types/AVIArticle/assets?field:name:equals=Article%201");
              jqXHR1.fail(
                function(xhr, message, error)
                {
                  oj.Logger.error(error);
                }
              );
              jqXHR1.done(
                function(data)
                {
                  var link = data.items[0].link.href;
                });
              */

              var requestURL = sitesHost + baseURL + articleURL + "/1502442358841?expand=AVIImage&fields=name,headline,relatedImage,abstract,body";
              var jqXHR = $.getJSON(requestURL);
              jqXHR.fail(
                function(xhr, message, error)
                {
                  oj.Logger.error(error);
                }
              );

              this.moduleSettings =
              {
                name: 'ojModule-dynamicData/article',
                params:
                {
                  dataPromise: jqXHR
                }
              }
            }

            $(function()
            {
              ko.applyBindings(new DynamicDataModuleModel(), document.getElementById('moduleDemo'));
            });

          });
