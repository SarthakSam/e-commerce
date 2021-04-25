const endpoints = {
    'signup': `/signup`,
    'signin': `/signin`
}

export const getUrl = ({ mappingKey, urlParams = {} }) => {
    return Object.keys(urlParams).reduce( (acc, cur) => { 
        acc = acc.replace(`:/${cur}`, urlParams[cur]);
        return acc;
     }, endpoints[mappingKey] );
}