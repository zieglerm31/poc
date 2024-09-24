
echo "this routes all traffic to the OLD RTE instance (seese6 IRS_Camel_1-h3irs_RTE/IRS_SIP_1-h3irs_RTE) ... routing is disabled"
echo ""
echo "RTE old works in ocadmin namespace"
echo ""
appdbip=`/appl/vtas/bin/nexus-redis/redis-cli -h 172.20.209.69 -p 26380 info |grep appdb | cut -d"," -f3 | cut -d"=" -f2 | cut -d":" -f1`
appdbport=`/appl/vtas/bin/nexus-redis/redis-cli -h 172.20.209.69 -p 26380 info |grep appdb | cut -d"," -f3 | cut -d"=" -f2 | cut -d":" -f2`
/appl/vtas/bin/nexus-redis/redis-cli -h ${appdbip} -p ${appdbport} -x set routingkey_IRS_Camel_RTE < ./movetoOld.json
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



