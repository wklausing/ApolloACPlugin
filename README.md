# Access Control Plugin

Privacy is an important factor in today's electronic world as information systems increase in size with unprecedented speed. Information can be easily stored, captured and shared in magnitudes and ways that were never seen before. In this kind of environment privacy engineering becomes more important. Access control can ensure privacy protection and help service provider to respect personal data. 

The goal of this project was to create a valuable and qualitative access control component - to design a privacy tool which is re-useable, flexible, developer-friendly and provide a way for Apollo Servers to easily integrate access control into their system. It gives developers the ability to block or restrict data by setting up rules for any and all query fields. Currently, two access control models are supported:

- Header-based Access Control: Enables developers to create rules based on the header information of an incoming request. It allows the developer to block/restrict query fields and only provide the requested information if the request's header meets the conditions.

- Purpose-based Access Control: Information can be restricted based on a given purpose, everything that is outside of that purpose scope would be invalid. Purpose-based access control enables developers to create rules based on a purpose and block/restrict query fields. Clients would have to always state a purpose in addition to their regular GraphQL query.

More information regarding the plugin and in-depth explaination and examples can be found [here](https://github.com/wklausing/Re-Useable-Access-Control-Plugin-for-Apollo-Server/wiki).
