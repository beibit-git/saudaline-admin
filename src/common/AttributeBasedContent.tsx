import React from 'react';
import getAttribute from '../helpers/getAttribute';

interface Attribute {
  requestedAtt : string[],
  children : any;
}
const AttributeBasedContent:React.FC<Attribute> = ({requestedAtt, children}):JSX.Element => {
    return <>{getAttribute(requestedAtt) && children}</>
}


export default AttributeBasedContent;



