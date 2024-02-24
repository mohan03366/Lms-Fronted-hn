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
npm install -D tailwindcss postcss autoprefixer
'''

2.create tailwind config file

'''
npx tailwindcss init
npx tailwind init -p
''' 3. add file extension to tailwind config file in the contenet proberties
'''
"./src/\*_/_.{html,js, jsx, ts, tsx}", "./index.html"
'''

4. add the tailwind directives at the top of the "index.css" file

'''
@tailwind base;
@tailwind components;
@tailwind utilities;

4.1=add the follwin details in the pluggin property of tailwind config

    '''
    require("daisyui"), require("@tailwindcss/line-clamp")
    '''

''' 5. add pluggin and dependencies
'''
"@reduxjs/toolkit": "^2.2.1",
"axios": "^1.6.7",
"chart.js": "^4.4.1",
"daisyui": "^4.7.2",
"react": "^18.2.0",
"react-chartjs-2": "^5.2.0",
"react-dom": "^18.2.0",

    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.0.1",
    "react-redux": "^9.1.0",
    "react-router-dom": "^6.22.1"

'''
