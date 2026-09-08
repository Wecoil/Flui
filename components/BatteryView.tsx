import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Battery, BatteryCharging, Clock, MapPin, TrendingDown, Zap, AlertTriangle } from "lucide-react-native";

export default function BatteryView() {
  const batteryLevel = 68;
  const history = [
    ["05 Jun", "Shopping Center", "32 min", "R$ 45,20", "85%"],
    ["02 Jun", "Posto Paulista", "28 min", "R$ 38,50", "72%"],
    ["29 Mai", "Terminal Norte", "35 min", "R$ 52,30", "95%"],
  ];

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ paddingBottom: 30 }}>
      <Header />
      <View style={styles.card}>
        <View style={styles.cardRow}><View><Text style={styles.light}>Nível Atual</Text><Text style={styles.percent}>{batteryLevel}%</Text></View><BatteryCharging size={60} color="#fff" /></View>
        <View style={styles.track}><View style={[styles.fill, { width: `${batteryLevel}%` }]} /></View>
        <View style={styles.cardRow}><Text style={styles.light}>Autonomia restante</Text><Text style={styles.whiteBold}>245 km</Text></View>
      </View>
      <View style={styles.grid}>
        <Metric icon={<TrendingDown size={18} color="#111827" />} label="Consumo médio" value="18.5 kWh" sub="por 100 km" />
        <Metric icon={<Zap size={18} color="#111827" />} label="Economia" value="R$ 892" sub="este mês" />
        <Metric icon={<Clock size={18} color="#111827" />} label="Tempo total" value="2h 15min" sub="carregando" />
        <Metric icon={<MapPin size={18} color="#111827" />} label="Distância" value="1.247 km" sub="este mês" />
      </View>
      <View style={styles.section}><View style={styles.sectionTitle}><AlertTriangle size={18} color="#d97706" /><Text style={styles.heading}>Saúde da bateria</Text></View><Text style={styles.text}>Saúde estimada em 98%. Temperatura normal e sem alertas críticos.</Text></View>
      <View style={styles.section}><Text style={styles.heading}>Histórico de carregamento</Text>{history.map((row) => <View key={row[0]} style={styles.history}><View><Text style={styles.bold}>{row[1]}</Text><Text style={styles.muted}>{row[0]} · {row[2]}</Text></View><View style={{alignItems:"flex-end"}}><Text style={styles.bold}>{row[3]}</Text><Text style={styles.muted}>+{row[4]}</Text></View></View>)}</View>
    </ScrollView>
  );
}

function Header() { return <View style={styles.header}><View style={styles.headerIcon}><Battery size={24} color="#fff" /></View><View><Text style={styles.title}>Bateria</Text><Text style={styles.subtitle}>Status e histórico</Text></View></View>; }
function Metric({ icon, label, value, sub }: any) { return <View style={styles.metric}><View style={styles.metricTop}>{icon}<Text style={styles.muted}>{label}</Text></View><Text style={styles.metricValue}>{value}</Text><Text style={styles.muted}>{sub}</Text></View>; }

const styles = StyleSheet.create({
  root:{flex:1,backgroundColor:"#f8fafc"}, header:{backgroundColor:"#fff",padding:22,flexDirection:"row",alignItems:"center",gap:12,borderBottomWidth:1,borderBottomColor:"#e5e7eb"}, headerIcon:{width:48,height:48,borderRadius:16,backgroundColor:"#0f766e",alignItems:"center",justifyContent:"center"}, title:{fontSize:18,fontWeight:"800",color:"#111827"},subtitle:{color:"#0f766e",marginTop:2},
  card:{margin:16,padding:20,borderRadius:20,backgroundColor:"#0f766e"},cardRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},light:{color:"#ccfbf1",fontSize:12},percent:{color:"#fff",fontSize:40,fontWeight:"900",marginTop:2},whiteBold:{color:"#fff",fontWeight:"800"},track:{height:12,backgroundColor:"#115e59",borderRadius:8,overflow:"hidden",marginVertical:14},fill:{height:"100%",backgroundColor:"#fff",borderRadius:8},
  grid:{paddingHorizontal:16,flexDirection:"row",flexWrap:"wrap",gap:10},metric:{width:"47.8%",backgroundColor:"#fff",padding:14,borderRadius:14,borderWidth:1,borderColor:"#e5e7eb"},metricTop:{flexDirection:"row",alignItems:"center",gap:7,marginBottom:8},metricValue:{fontSize:20,fontWeight:"900",color:"#111827",marginBottom:2},muted:{fontSize:12,color:"#6b7280"},section:{margin:16,marginBottom:0,padding:16,backgroundColor:"#fff",borderRadius:16,borderWidth:1,borderColor:"#e5e7eb"},sectionTitle:{flexDirection:"row",alignItems:"center",gap:7,marginBottom:8},heading:{fontSize:16,fontWeight:"800",color:"#111827"},text:{color:"#4b5563",lineHeight:20},history:{paddingVertical:13,flexDirection:"row",justifyContent:"space-between",borderBottomWidth:1,borderBottomColor:"#f3f4f6"},bold:{fontWeight:"700",color:"#111827",marginBottom:3}
});
