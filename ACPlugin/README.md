The Access Control Plugin loads two configuration files, purpose.yml and rules.json.

- purpose.yml uses YAML to define a purpose tree for purpose-based access control. 
- rules.json uses JSON to define access control rules that can be applied to any query field. An in-depth guide on the rules format can be read [here](https://github.com/wklausing/Re-Useable-Access-Control-Plugin-for-Apollo-Server/wiki/Rule-Configuration)

Integrating the plugin into an Apollo Server can be done with ease. For more information, check out [this wiki page](https://github.com/wklausing/Re-Useable-Access-Control-Plugin-for-Apollo-Server/wiki/Plugin-Integration-into-Apollo-Server).
