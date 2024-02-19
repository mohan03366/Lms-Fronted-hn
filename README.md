## Lms-fronted-hn

### setup instructions

1. clone the projects

'''
git clone: https://github.com/mohan03366/Lms-Fronted-hn.git
'''

2. move into the directory

'''
cd Lms-fronted
'''

3.install dependencies

'''
npm i
'''

4.run the server

'''
npm run dev
'''

### setup instruction for tailwind

[tailwind official instruction doc] (https://tailwindcss.com/docs/installation);

1. install tailwind css

'''
npm install -D tailwindcss
'''

2.create tailwind config file

'''
npx tailwindcss init
''' 3. add file extension to tailwind config file in the contenet proberties
'''
"./src/\*_/_.{html,js, jsx, ts, tsx}"
'''

4. add the tailwind directives at the top of the "index.css" file

'''
@tailwind base;
@tailwind components;
@tailwind utilities;
'''
