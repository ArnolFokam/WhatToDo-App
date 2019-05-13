### Running the app

#### `step 1: Download and install Git`(optional.it depends on if you want to clone the repository or download it.for clonnig take this step)

##### In Linux Distros (Ubuntu, Kali Linux)

```bash
$ sudo apt-get install git 
 ```
 Note: you should "yum" instead of "apt-get" for other distros.Depending on your package manager.(I don't really know much about other linux distribution).
 
##### In Windows 
 
Just download and install [git](https://git-scm.com/download/win).
 
 

#### `step 2: Download and install node and npm`

##### In Linux Distros (Ubuntu, Kali Linux)

```bash
$ sudo apt-get install npm nodejs-legacy
 ```
 Or you can just follow the instruction on [nodeJS website](https://nodejs.org/en/download/package-manager/) (preferable :-\ )
 
 
##### In Windows 
 
Just download and install [nodeJS](https://nodejs.org/en/) (on the download page choose the LTS latest stable version ;) ).

 
 #### `step 3: Clone the repository`(assuming you have git installed)

enter the following command on your terminal (note that the directory where you are in your terminal is the directory where the folder of the project will be download)

```bash
$ git clone https://github.com/ArnolFokam/WhatToDo-App.git
 ```
 
  
 
 #### `step 4: cd in the repository` (assuming you downloaded or cloned the project folder and have it named as WhatToDo-App)

```bash
$ cd WhatToDo-App
```

 #### `step 5: Install dependencies`

##### In Linux Distros (Ubuntu, Kali Linux) && Windows

```bash
$ npm install
``` 



#### `step 6:  run application`

```bash
$ npm run start
```
In browser, open [http://localhost:3000](http://localhost:3000)


