import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Award, Crown, Flame, Gift, Lock, MapPin, Medal, Star, Target, TrendingUp, Trophy, Users, Zap } from "lucide-react-native";

type Tab = "overview" | "achievements" | "rewards" | "leaderboard";

const achievements = [
  ["Primeiro Passo", "Complete sua primeira viagem", true, "🚗"],
  ["Maratonista", "Rode 1.000 km no total", true, "🏃"],
  ["Explorador", "Visite 10 estações diferentes", true, "🗺️"],
  ["Eco Guerreiro", "Economize 1.000 kg de CO2", true, "🌱"],
  ["Sequência de Ouro", "Mantenha 30 dias de uso", false, "⭐"],
  ["Campeão EV", "Alcance nível 20", false, "👑"],
];

const rewards = [
  ["10% de desconto", "Estação Shopping Center", 500, "Carregamento"],
  ["Café grátis", "Rede Posto Verde", 200, "Parceiro"],
  ["15% de desconto", "Manutenção AutoEV", 800, "Serviço"],
  ["Upgrade de plano", "EV Navigator Premium", 2000, "App"],
  ["R$ 50 em créditos", "Carregamento Rápido", 1500, "Carregamento"],
];

const leaderboard = [
  ["Maria Santos", 8950, 15, "👩", "👑"], ["Pedro Costa", 7230, 13, "👨", "🥈"],
  ["Ana Lima", 6890, 12, "👩", "🥉"], ["Carlos Silva", 5420, 11, "👨", ""],
  ["Juliana Souza", 4780, 10, "👩", ""], ["Você", 3450, 8, "🚗", ""],
];

export default function RewardsView() {
  const [tab, setTab] = useState<Tab>("overview");
  return (
    <ScrollView style={styles.root} contentContainerStyle={{ padding: 16, paddingBottom: 30 }}>
      <View style={styles.header}><View style={styles.icon}><Trophy size={23} color="#fff" /></View><View><Text style={styles.title}>Recompensas</Text><Text style={styles.subtitle}>Evolua enquanto dirige</Text></View></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:8,marginBottom:14}}>
        {(["overview","achievements","rewards","leaderboard"] as Tab[]).map((key) => <Pressable key={key} onPress={() => setTab(key)} style={[styles.tab,tab===key&&styles.tabActive]}><Text style={[styles.tabText,tab===key&&styles.tabTextActive]}>{({overview:"Visão geral",achievements:"Conquistas",rewards:"Prêmios",leaderboard:"Ranking"} as any)[key]}</Text></Pressable>)}
      </ScrollView>
      {tab === "overview" && <Overview />}
      {tab === "achievements" && <View style={{gap:10}}>{achievements.map(([title,desc,unlocked,emoji],i)=><View key={i} style={[styles.item,!unlocked&&styles.locked]}><View style={styles.emoji}>{unlocked ? <Text style={{fontSize:28}}>{emoji}</Text> : <Lock size={24} color="#9ca3af" />}</View><View style={{flex:1}}><Text style={styles.bold}>{title}</Text><Text style={styles.muted}>{desc}</Text></View>{unlocked&&<Star size={20} color="#111827" fill="#111827" />}</View>)}</View>}
      {tab === "rewards" && <View style={{gap:10}}>{rewards.map(([title,provider,points,type],i)=><View key={i} style={styles.item}><View style={styles.rewardIcon}><Gift size={20} color="#fff" /></View><View style={{flex:1}}><Text style={styles.bold}>{title}</Text><Text style={styles.muted}>{provider}</Text><Text style={styles.points}>{points} pts · {type}</Text></View><Pressable style={styles.smallButton}><Text style={styles.smallButtonText}>Resgatar</Text></Pressable></View>)}</View>}
      {tab === "leaderboard" && <View style={{gap:9}}>{leaderboard.map(([name,points,level,avatar,badge],i)=><View key={i} style={[styles.rankItem,name==="Você"&&styles.current]}><View style={styles.rank}><Text style={styles.rankText}>{i+1}</Text></View><Text style={{fontSize:25}}>{avatar}</Text><View style={{flex:1}}><Text style={styles.bold}>{name} {badge}</Text><Text style={styles.muted}>{Number(points).toLocaleString()} pts · Nv. {level}</Text></View></View>)}</View>}
    </ScrollView>
  );
}

function Overview() {
  return <View style={{gap:12}}>
    <View style={styles.levelCard}><View style={{flexDirection:"row",justifyContent:"space-between"}}><View><View style={styles.inline}><Crown size={18} color="#fff" /><Text style={{color:"#d1d5db"}}>Condutor Elite</Text></View><Text style={styles.level}>Nv. 8</Text><Text style={{color:"#9ca3af"}}>3.450 pts</Text></View><View style={styles.streak}><Flame size={15} color="#fff" /><Text style={{color:"#fff",fontWeight:"800"}}>12 dias</Text></View></View><Text style={{color:"#d1d5db",marginTop:20}}>Próximo nível · 450/500 pts</Text><View style={styles.progress}><View style={[styles.progressFill,{width:"90%"}]} /></View></View>
    <Text style={styles.sectionTitle}>Metas do mês</Text>
    <Goal icon={<TrendingUp size={18} color="#fff" />} title="Meta de Quilometragem" current="1.247/1.500 km" progress="83%" reward="+200 pts" />
    <Goal icon={<MapPin size={18} color="#fff" />} title="Explorador de Estações" current="3/5 locais" progress="60%" reward="+150 pts" />
    <Goal icon={<Zap size={18} color="#fff" />} title="Carregamento Eficiente" current="92/80%" progress="100%" reward="+100 pts" />
    <View style={{flexDirection:"row",gap:10}}><View style={styles.quick}><Award size={28} color="#111827"/><Text style={styles.quickNumber}>4</Text><Text style={styles.muted}>Conquistas</Text></View><View style={styles.quick}><Gift size={28} color="#111827"/><Text style={styles.quickNumber}>8</Text><Text style={styles.muted}>Recompensas</Text></View></View>
  </View>
}
function Goal({icon,title,current,progress,reward}:{icon:React.ReactNode;title:string;current:string;progress:`${number}%`;reward:string}){return <View style={styles.goal}><View style={styles.inline}><View style={styles.goalIcon}>{icon}</View><View style={{flex:1}}><Text style={styles.bold}>{title}</Text><Text style={styles.muted}>{current}</Text></View><Text style={styles.points}>{reward}</Text></View><View style={styles.progress}><View style={[styles.progressFill,{width:progress}]} /></View></View>}

const styles=StyleSheet.create({
  root:{flex:1,backgroundColor:"#f8fafc"},header:{backgroundColor:"#fff",margin:-16,marginBottom:14,padding:22,flexDirection:"row",alignItems:"center",gap:12},icon:{width:48,height:48,borderRadius:16,backgroundColor:"#111827",alignItems:"center",justifyContent:"center"},title:{fontSize:18,fontWeight:"800",color:"#111827"},subtitle:{color:"#0f766e",marginTop:2},tab:{paddingHorizontal:14,paddingVertical:9,borderRadius:12,backgroundColor:"#e5e7eb"},tabActive:{backgroundColor:"#111827"},tabText:{color:"#4b5563",fontWeight:"700"},tabTextActive:{color:"#fff"},levelCard:{backgroundColor:"#111827",borderRadius:20,padding:20},inline:{flexDirection:"row",alignItems:"center",gap:7},level:{color:"#fff",fontSize:42,fontWeight:"900",marginTop:12},streak:{backgroundColor:"#1f2937",paddingHorizontal:10,paddingVertical:7,borderRadius:20,alignSelf:"flex-start",flexDirection:"row",gap:5},progress:{height:8,backgroundColor:"#e5e7eb",borderRadius:8,overflow:"hidden",marginTop:9},progressFill:{height:"100%",backgroundColor:"#0f766e",borderRadius:8},sectionTitle:{fontSize:17,fontWeight:"800",color:"#111827"},goal:{backgroundColor:"#fff",padding:14,borderRadius:15,borderWidth:1,borderColor:"#e5e7eb"},goalIcon:{width:38,height:38,borderRadius:11,backgroundColor:"#111827",alignItems:"center",justifyContent:"center"},bold:{fontWeight:"700",color:"#111827"},muted:{color:"#6b7280",fontSize:12,marginTop:2},points:{color:"#0f766e",fontWeight:"800",fontSize:12},quick:{flex:1,backgroundColor:"#fff",padding:16,borderRadius:15,borderWidth:1,borderColor:"#e5e7eb",alignItems:"center"},quickNumber:{fontSize:24,fontWeight:"900",color:"#111827",marginTop:5},item:{backgroundColor:"#fff",padding:14,borderRadius:15,borderWidth:1,borderColor:"#e5e7eb",flexDirection:"row",alignItems:"center",gap:12},locked:{opacity:.55},emoji:{width:55,height:55,borderRadius:14,backgroundColor:"#f3f4f6",alignItems:"center",justifyContent:"center"},rewardIcon:{width:42,height:42,borderRadius:12,backgroundColor:"#0f766e",alignItems:"center",justifyContent:"center"},smallButton:{backgroundColor:"#111827",paddingHorizontal:11,paddingVertical:9,borderRadius:10},smallButtonText:{color:"#fff",fontWeight:"700",fontSize:12},rankItem:{backgroundColor:"#fff",padding:12,borderRadius:14,borderWidth:1,borderColor:"#e5e7eb",flexDirection:"row",alignItems:"center",gap:10},current:{borderColor:"#111827",borderWidth:2},rank:{width:34,height:34,borderRadius:10,backgroundColor:"#f3f4f6",alignItems:"center",justifyContent:"center"},rankText:{fontWeight:"900",color:"#374151"}
});
