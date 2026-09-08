import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Bell, ChevronRight, CreditCard, Globe, HelpCircle, MapPin, Moon, Settings, Shield, User } from "lucide-react-native";

const sections = [
  ["Conta", [
    [User, "Perfil", "Informações pessoais"],
    [CreditCard, "Pagamento", "Métodos de pagamento"],
  ]],
  ["Preferências", [
    [Bell, "Notificações", "Alertas e avisos"],
    [MapPin, "Localização", "Permissões de GPS"],
    [Moon, "Tema", "Claro ou escuro"],
    [Globe, "Idioma", "Português (Brasil)"],
  ]],
  ["Suporte", [
    [HelpCircle, "Central de Ajuda", "FAQ e tutoriais"],
    [Shield, "Privacidade", "Política e termos"],
  ]],
] as any[];

export default function SettingsView() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={{paddingBottom:30}}>
      <View style={styles.header}><View style={styles.headerIcon}><Settings size={24} color="#fff"/></View><View><Text style={styles.title}>Configurações</Text><Text style={styles.subtitle}>Personalize seu app</Text></View></View>
      <View style={styles.profile}><View style={styles.avatar}><User size={28} color="#fff"/></View><View style={{flex:1}}><Text style={styles.profileName}>João Silva</Text><Text style={styles.profileEmail}>joao.silva@email.com</Text></View><ChevronRight size={20} color="#9ca3af"/></View>
      <View style={styles.vehicle}><View style={{flexDirection:"row",justifyContent:"space-between"}}><Text style={styles.bold}>Meu Veículo</Text><Text style={styles.link}>Alterar</Text></View><View style={{flexDirection:"row",alignItems:"center",gap:12,marginTop:12}}><View style={styles.car}><Text style={{fontSize:24}}>🚗</Text></View><View><Text style={styles.bold}>Tesla Model 3</Text><Text style={styles.muted}>Long Range 2023</Text></View></View></View>
      {sections.map(([title,items],index)=><View key={index} style={styles.section}><Text style={styles.sectionTitle}>{title}</Text><View style={styles.list}>{items.map(([Icon,label,desc]:any,i:number)=><Pressable key={i} style={styles.item}><View style={styles.itemIcon}><Icon size={18} color="#fff"/></View><View style={{flex:1}}><Text style={styles.bold}>{label}</Text><Text style={styles.muted}>{desc}</Text></View><ChevronRight size={18} color="#9ca3af"/></Pressable>)}</View></View>)}
      <Text style={styles.version}>EV Navigator v1.0.0</Text>
    </ScrollView>
  );
}

const styles=StyleSheet.create({
 root:{flex:1,backgroundColor:"#f8fafc"},header:{backgroundColor:"#fff",padding:22,flexDirection:"row",alignItems:"center",gap:12,borderBottomWidth:1,borderBottomColor:"#e5e7eb"},headerIcon:{width:48,height:48,borderRadius:16,backgroundColor:"#111827",alignItems:"center",justifyContent:"center"},title:{fontSize:18,fontWeight:"800",color:"#111827"},subtitle:{color:"#6b7280",marginTop:2},profile:{margin:16,padding:16,borderRadius:18,backgroundColor:"#111827",flexDirection:"row",alignItems:"center",gap:12},avatar:{width:58,height:58,borderRadius:29,backgroundColor:"#374151",alignItems:"center",justifyContent:"center"},profileName:{color:"#fff",fontSize:17,fontWeight:"800"},profileEmail:{color:"#d1d5db",fontSize:12,marginTop:2},vehicle:{marginHorizontal:16,padding:16,borderRadius:15,backgroundColor:"#fff",borderWidth:1,borderColor:"#e5e7eb"},bold:{fontWeight:"700",color:"#111827"},link:{fontWeight:"700",color:"#0f766e"},car:{width:48,height:48,borderRadius:12,backgroundColor:"#f3f4f6",alignItems:"center",justifyContent:"center"},muted:{color:"#6b7280",fontSize:12,marginTop:2},section:{margin:16,marginBottom:0},sectionTitle:{fontSize:12,fontWeight:"800",color:"#6b7280",textTransform:"uppercase",marginBottom:8},list:{backgroundColor:"#fff",borderWidth:1,borderColor:"#e5e7eb",borderRadius:15,overflow:"hidden"},item:{minHeight:68,padding:13,flexDirection:"row",alignItems:"center",gap:11,borderBottomWidth:1,borderBottomColor:"#f3f4f6"},itemIcon:{width:40,height:40,borderRadius:10,backgroundColor:"#111827",alignItems:"center",justifyContent:"center"},version:{textAlign:"center",color:"#9ca3af",fontSize:12,marginTop:24}
});
