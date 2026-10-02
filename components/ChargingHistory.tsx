import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BatteryCharging, CalendarDays, MapPin, Zap } from "lucide-react-native";

type Charge = { id: number; station: string; address: string; date: string; time: string; energy: number; amount: number; duration: string };
// Registros fictícios para demonstração; não representam transações reais.
const history: Charge[] = [
  { id: 1, station: "Estação Shopping Center", address: "Av. Paulista, 1000 - Bela Vista", date: "28 set 2026", time: "14:35", energy: 32.4, amount: 90.72, duration: "42 min" },
  { id: 2, station: "Posto Paulista", address: "Rua da Consolação, 1500", date: "24 set 2026", time: "09:10", energy: 21.8, amount: 54.50, duration: "36 min" },
  { id: 3, station: "Estacionamento Sul", address: "Av. Brigadeiro, 2000", date: "19 set 2026", time: "18:22", energy: 18.6, amount: 35.34, duration: "58 min" },
  { id: 4, station: "Terminal Norte", address: "Av. Tiradentes, 800", date: "12 set 2026", time: "11:05", energy: 27.2, amount: 72.08, duration: "39 min" },
];
const totalEnergy = history.reduce((sum, item) => sum + item.energy, 0);
const totalSpent = history.reduce((sum, item) => sum + item.amount, 0);
export default function ChargingHistory() {
  return <ScrollView style={styles.root} contentContainerStyle={styles.content}>
    <View style={styles.header}><View style={styles.headerIcon}><BatteryCharging size={23} color="#fff" /></View><View><Text style={styles.title}>Histórico de recargas</Text><Text style={styles.subtitle}>Acompanhe suas recargas anteriores</Text></View></View>
    <View style={styles.notice}><Text style={styles.noticeText}>Dados simulados para demonstração do aplicativo.</Text></View>
    <View style={styles.summaryRow}><View style={styles.summaryCard}><Zap size={19} color="#0f766e"/><Text style={styles.summaryValue}>{totalEnergy.toFixed(1).replace(".", ",")} kWh</Text><Text style={styles.summaryLabel}>Energia carregada</Text></View><View style={styles.summaryCard}><Text style={styles.currency}>R$</Text><Text style={styles.summaryValue}>{totalSpent.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text><Text style={styles.summaryLabel}>Total gasto</Text></View></View>
    <Text style={styles.sectionTitle}>Recargas recentes</Text>
    {history.map((item) => <View key={item.id} style={styles.card}>
      <View style={styles.cardTop}><View style={styles.stationIcon}><Zap size={19} color="#0f766e" /></View><View style={{ flex: 1 }}><Text style={styles.stationName}>{item.station}</Text><View style={styles.addressRow}><MapPin size={12} color="#6b7280"/><Text style={styles.address}>{item.address}</Text></View></View><Text style={styles.amount}>R$ {item.amount.toFixed(2).replace(".", ",")}</Text></View>
      <View style={styles.divider}/><View style={styles.details}><View style={styles.detail}><CalendarDays size={14} color="#6b7280"/><Text style={styles.detailText}>{item.date} · {item.time}</Text></View><View style={styles.detail}><Zap size={14} color="#0f766e"/><Text style={styles.detailText}>{item.energy.toFixed(1).replace(".", ",")} kWh</Text></View><View style={styles.detail}><Text style={styles.duration}>{item.duration}</Text></View></View>
    </View>)}
  </ScrollView>;
}
const styles = StyleSheet.create({
 root:{flex:1,backgroundColor:"#f8fafc"},content:{padding:16,paddingBottom:30},header:{backgroundColor:"#fff",margin:-16,marginBottom:14,padding:22,flexDirection:"row",alignItems:"center",gap:12},headerIcon:{width:48,height:48,borderRadius:16,backgroundColor:"#0f766e",alignItems:"center",justifyContent:"center"},title:{fontSize:18,fontWeight:"800",color:"#111827"},subtitle:{color:"#6b7280",marginTop:2,fontSize:12},notice:{backgroundColor:"#ecfdf5",padding:10,borderRadius:10,marginBottom:14},noticeText:{color:"#047857",fontSize:12,fontWeight:"600"},summaryRow:{flexDirection:"row",gap:10,marginBottom:22},summaryCard:{flex:1,backgroundColor:"#fff",borderRadius:15,padding:14,borderWidth:1,borderColor:"#e5e7eb",gap:5},summaryValue:{fontSize:20,fontWeight:"800",color:"#111827"},summaryLabel:{fontSize:11,color:"#6b7280"},currency:{fontSize:17,fontWeight:"800",color:"#0f766e"},sectionTitle:{fontSize:16,fontWeight:"800",color:"#111827",marginBottom:10},card:{backgroundColor:"#fff",borderRadius:15,borderWidth:1,borderColor:"#e5e7eb",padding:14,marginBottom:10},cardTop:{flexDirection:"row",alignItems:"center",gap:10},stationIcon:{width:40,height:40,borderRadius:12,backgroundColor:"#ecfdf5",alignItems:"center",justifyContent:"center"},stationName:{fontWeight:"700",color:"#111827",fontSize:13},addressRow:{flexDirection:"row",alignItems:"center",gap:4,marginTop:4},address:{fontSize:10,color:"#6b7280",flexShrink:1},amount:{fontWeight:"800",color:"#0f766e",fontSize:13},divider:{height:1,backgroundColor:"#f3f4f6",marginVertical:12},details:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8},detail:{flexDirection:"row",alignItems:"center",gap:4},detailText:{fontSize:11,color:"#6b7280"},duration:{fontSize:11,color:"#6b7280"}
});
