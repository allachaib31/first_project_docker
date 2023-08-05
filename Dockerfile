#hada file nsn3o fih 7aja ysmoha image we fi image chaque line to3tbar layer
FROM node:19.9.0
# haka optional mchi oblige tmchi node index.js
WORKDIR /app
# khadi copy les information man package json we y7otha fi . ma3ntha directory principcal lirana nkhadmo bih wla ndiro  /app
COPY package.json .
#RUN npm install
#hada argument na3tolh 9ima fi dev we prod
ARG NODE_ENV 
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

# darna zoj copy psq 3la jal optimisation
COPY . ./
ENV PORT 3000
EXPOSE $PORT
#CMD [ "npm","run","dev" ]
CMD [ "node", "index.js" ]