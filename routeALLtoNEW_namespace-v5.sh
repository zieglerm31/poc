
echo "this routes all traffic to the new RTEv5 instance (seese3 IRS_Camel_1-h3irs_RTE/IRS_SIP_1-h3irs_RTE)"
echo ""
echo "RTEv5 NEW works in staging namespace"
echo ""


appdbip=`/appl/vtas/bin/nexus-redis/redis-cli -h 172.20.209.69 -p 26380 info |grep appdb | cut -d"," -f3 | cut -d"=" -f2 | cut -d":" -f1`
appdbport=`/appl/vtas/bin/nexus-redis/redis-cli -h 172.20.209.69 -p 26380 info |grep appdb | cut -d"," -f3 | cut -d"=" -f2 | cut -d":" -f2`
/appl/vtas/bin/nexus-redis/redis-cli -h ${appdbip} -p ${appdbport} -x set routingkey_IRS_Camel_RTE < ./movetoNewv5.json
/appl/vtas/bin/nexus-redis/redis-cli -h ${appdbip} -p ${appdbport} get routingkey_IRS_Camel_RTE | jq

echo "update profile timestamp (pre v5)"
epoch=`date +%s000`
/appl/vtas/bin/nexus-redis/redis-cli -h ${appdbip} -p ${appdbport} hmset internal:caches-timestamps env-profiles $epoch
/appl/vtas/bin/nexus-redis/redis-cli -h ${appdbip} -p ${appdbport} hmget internal:caches-timestamps env-profiles

echo "routing updated ... all goes to new RTEv5"

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



