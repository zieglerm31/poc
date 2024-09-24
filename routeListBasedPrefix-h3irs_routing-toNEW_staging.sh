
echo "this routes only the suffix matched from list h3irs_routing to the new RTEv5 on seese3 IRS_Camel_1-h3irs_RTE/IRS_SIP_1-h3irs_RTE"

appdbip=`/appl/vtas/bin/nexus-redis/redis-cli -h 172.20.209.69 -p 26380 info |grep appdb | cut -d"," -f3 | cut -d"=" -f2 | cut -d":" -f1`
appdbport=`/appl/vtas/bin/nexus-redis/redis-cli -h 172.20.209.69 -p 26380 info |grep appdb | cut -d"," -f3 | cut -d"=" -f2 | cut -d":" -f2`
/appl/vtas/bin/nexus-redis/redis-cli -h ${appdbip} -p ${appdbport} -x set routingkey_IRS_Camel_RTE < ./ListBasedPrefix.json
/appl/vtas/bin/nexus-redis/redis-cli -h ${appdbip} -p ${appdbport} get routingkey_IRS_Camel_RTE | jq

echo "update profile and list timestamp (pre v5)"
epoch=`date +%s000`
/appl/vtas/bin/nexus-redis/redis-cli -h ${appdbip} -p ${appdbport} hmset internal:caches-timestamps env-profiles $epoch
/appl/vtas/bin/nexus-redis/redis-cli -h ${appdbip} -p ${appdbport} hmget internal:caches-timestamps env-profiles
/appl/vtas/bin/nexus-redis/redis-cli -h ${appdbip} -p ${appdbport} hmset internal:caches-timestamps lists $epoch
/appl/vtas/bin/nexus-redis/redis-cli -h ${appdbip} -p ${appdbport} hmget internal:caches-timestamps env-profiles


exit

cat movetoNewv5.json
{
  "routingType": "random",
  "maxSlotOtherRte": 16383,
  "matchTypeInList": "suffix"
}

cat movetoOld.json
{
  "routingType": "random",
  "maxSlotOtherRte": 0,
  "matchTypeInList": "suffix"
}



