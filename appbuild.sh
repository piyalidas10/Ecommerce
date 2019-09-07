#build the package
npm run ecommerce-build-prod

#copy from dist of widget directory to main directory
cp -R dist/ecommerce/. ./ecommerce_backend/angular/ 
