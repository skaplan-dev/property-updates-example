import React, { useState, useEffect } from "react";
import {
 Divider,
 Text,
 hubspot,
 DescriptionList,
 DescriptionListItem,
 Heading,
 Flex,
} from "@hubspot/ui-extensions";
import { CrmPropertyList } from "@hubspot/ui-extensions/crm";


// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
 <Extension
   context={context}
   runServerless={runServerlessFunction}
   actions={actions}
 />
));


const Extension = ({ actions }) => {
 const { fetchCrmObjectProperties, onCrmPropertiesUpdate } = actions;
 const [properties, setProperties] = useState([]);


 useEffect(() => {
   fetchCrmObjectProperties(["firstname", "lastname"]).then((resp) =>
{
  console.log('fetch crm properties')
  setProperties(resp)
}   );
 }, []);


 onCrmPropertiesUpdate(["firstname", "lastname"], (properties) => {
  console.log('on properties update')
   setProperties(properties);
 });


 return (
   <>
teyeyeyeysdasd!!
     <Flex direction="column" gap="md">
       <Heading>Change properties here</Heading>
       <Text>
         Your changes to properties are automatically refreshed. Go ahead and
         try to change the names.
       </Text>
       <CrmPropertyList
         properties={["firstname", "lastname"]}
         direction="row"
       />
     </Flex>


     <Divider />
     <Flex direction="column" gap="md">
       <Heading>Automated refresh with 'onCrmPropertiesUpdate'</Heading>
       <DescriptionList direction="row">
         {properties &&
           Object.entries(properties).map(([key, value]) => (
             <DescriptionListItem label={key}>{value}</DescriptionListItem>
           ))}
       </DescriptionList>
     </Flex>
   </>
 );
};
