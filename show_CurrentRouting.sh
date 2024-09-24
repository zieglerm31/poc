
echo "this shows the current traffic routing for IRS"
echo "routingType ... defines the type of routing"
echo "	the TAS route all traffic to the OLD RTE (seese6)"
echo "	the routing middleware on the OLD RTE uses the routingType to decide on the policy"
echo "		none	.... disabled"
echo "		random	.... random based routing on sessionid with maxSlotOtherRte out of 16383 ratio"
echo "		spel	.... list based routing on h3irs_routing with prefix or suffix (matchTypeInList) on spel - current spel is #event[\"event\"][\"callStart\"][\"leg\"][\"user\"]"
echo "		script	.... same as spel but library based .. currently not used"
echo ""
echo ""
echo "current routing policy used is ..."
echo ""
appdbip=`/appl/vtas/bin/nexus-redis/redis-cli -h 172.20.209.69 -p 26380 info |grep appdb | cut -d"," -f3 | cut -d"=" -f2 | cut -d":" -f1`
appdbport=`/appl/vtas/bin/nexus-redis/redis-cli -h 172.20.209.69 -p 26380 info |grep appdb | cut -d"," -f3 | cut -d"=" -f2 | cut -d":" -f2`
/appl/vtas/bin/nexus-redis/redis-cli -h ${appdbip} -p ${appdbport} get routingkey_IRS_Camel_RTE | jq





