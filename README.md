# MAIC Software

## How to build and deploy

1. Create an algolia account

2. In **src/App.js** change fill the info of your algolia API at lines 14, 205 and 206

3. Drop **utilities/data2.json** as indice in the algolia dashboard (you can now use localy the website)

4. Create a netlify account

5. Drag and drop

6. npm run build as a depoyment command

7. Root public/

8. Deploy

## What it can do

This program present different functions that are basic use cases of various API. To a 'template' can be associated different version. Also this program can generate form type interface for basic url get method. It also can present project composed of multiple folders.

## What it cannot do

It cannot present containers and cannot create a interface for basic API. Also you cannot download a full template in one click.

## Update the informations

This website uses nodejs react in order to render the different objects. It also uses algolia as a back-end and searching engine. Objects are dynamically added to the website according to the back-end. For the information inside those objects, they are also dynamically created. The main script **src/App.js** will create objects according to the **tree** associated to a template version. This **tree** discribe the different files and where they are located. Then, the app will create a place holder with a specific id for every files in a version. For all the **getformurl** type of template (basic form interface generated), it will create the said form. For those which don't match this categorie, the place holders will be filled with specific info later on (filled during runtime). When the user click on a file, the app will search the content of the file in **public/data/{nameOfTheApi}/{versionName}/{dirOfTheTemplate}**.
</br>
So in order to update the data base, you need to :

1. **Update the data base :** Either drag and drop a new data.json file, or add a new object manually in your algolia project ; **utilities/data2.json** servs as an example. Attention: a **tree** is required in every version and there has to be at least one version for every template.

2. **Update public/data folder :** Add your project inside **public/data/{nameOfTheApi}/{versionName}/**. Take attention to the names that have to match your **tree**.

3. **ReDeploy :** Simply redeploy.

## Problems

Right now the website is composed of parts that can be stored inside a backend, such as files inside **public/data/**. This is why we have to redeploy after evry single modifications. It would be better if an external API could take care of that.
