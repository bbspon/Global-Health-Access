// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ActivityIndicator,
// //   Alert,
// // } from 'react-native';
// // import { getComparisonPlans } from '../services/healthPlanAPI';

// // const PlanComparisonScreen = ({ navigation }) => {
// //   const [plans, setPlans] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [currency, setCurrency] = useState('INR');

// //   useEffect(() => {
// //     const fetchPlans = async () => {
// //       try {
// //         const data = await getComparisonPlans(currency);
// //         setPlans(data.plans);
// //       } catch (error) {
// //         Alert.alert('Error', 'Unable to fetch plan data');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPlans();
// //   }, [currency]);

// //   const currencyList = ['INR', 'AED', 'USD'];

// //   return (
// //     <ScrollView style={styles.wrapper}>
// //       <Text style={styles.title}>Compare Health Plans</Text>

// //       <View style={styles.currencyToggle}>
// //         {currencyList.map(c => (
// //           <TouchableOpacity
// //             key={c}
// //             style={[
// //               styles.currencyBtn,
// //               currency === c && styles.currencyBtnActive,
// //             ]}
// //             onPress={() => setCurrency(c)}
// //           >
// //             <Text
// //               style={currency === c ? styles.activeText : styles.inactiveText}
// //             >
// //               {c}
// //             </Text>
// //           </TouchableOpacity>
// //         ))}
// //       </View>

// //       {loading ? (
// //         <ActivityIndicator size="large" style={{ marginTop: 30 }} />
// //       ) : plans.length === 0 ? (
// //         <Text style={styles.empty}>No plans available.</Text>
// //       ) : (
// //         <ScrollView horizontal>
// //           <View style={styles.table}>
// //             <View style={styles.column}>
// //               <Text style={styles.header}>Feature</Text>
// //               <Text style={styles.cell}>Price</Text>
// //               <Text style={styles.cell}>Validity</Text>
// //               <Text style={styles.cell}>Recommended</Text>
// //               {plans[0]?.features?.map((_, idx) => (
// //                 <Text key={idx} style={styles.cell}>
// //                   Feature #{idx + 1}
// //                 </Text>
// //               ))}
// //             </View>

// //             {plans.map(plan => (
// //               <View key={plan._id} style={styles.column}>
// //                 <Text style={[styles.header, styles.name]}>
// //                   {plan.name}
// //                   {'\n'}
// //                   <Text style={styles.tier}>{plan.tier.toUpperCase()}</Text>
// //                 </Text>
// //                 <Text style={styles.cell}>₹ {plan.price}</Text>
// //                 <Text style={styles.cell}>{plan.validityInDays} days</Text>
// //                 <Text style={styles.cell}>
// //                   {plan.isRecommended ? '✅' : '—'}
// //                 </Text>
// //                 {plan.features.map((f, i) => (
// //                   <Text key={i} style={styles.cell}>
// //                     {f || '—'}
// //                   </Text>
// //                 ))}
// //               </View>
// //             ))}
// //           </View>
// //         </ScrollView>
// //       )}

// //       <TouchableOpacity
// //         onPress={() => navigation.goBack()}
// //         style={styles.backBtn}
// //       >
// //         <Text style={styles.backText}>← Back to Plans</Text>
// //       </TouchableOpacity>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   wrapper: { padding: 16, backgroundColor: '#fff', flex: 1 },
// //   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
// //   currencyToggle: {
// //     flexDirection: 'row',
// //     marginBottom: 12,
// //     justifyContent: 'flex-start',
// //     gap: 8,
// //   },
// //   currencyBtn: {
// //     borderWidth: 1,
// //     borderColor: '#17a2b8',
// //     borderRadius: 6,
// //     paddingHorizontal: 12,
// //     paddingVertical: 6,
// //     marginRight: 8,
// //   },
// //   currencyBtnActive: {
// //     backgroundColor: '#17a2b8',
// //   },
// //   activeText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //   },
// //   inactiveText: {
// //     color: '#17a2b8',
// //     fontWeight: 'bold',
// //   },
// //   table: { flexDirection: 'row' },
// //   column: { marginRight: 12 },
// //   header: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
// //   name: { color: '#007bff' },
// //   tier: { fontSize: 12, color: '#555' },
// //   cell: {
// //     fontSize: 14,
// //     paddingVertical: 6,
// //     borderBottomWidth: 0.5,
// //     borderBottomColor: '#ddd',
// //   },
// //   backBtn: { marginTop: 20, alignSelf: 'flex-start' },
// //   backText: { color: '#888', fontSize: 14 },
// //   empty: { marginTop: 20, textAlign: 'center', color: '#888' },
// // });

// // export default PlanComparisonScreen;


// import React from "react";
// import { View, Text, ScrollView, StyleSheet } from "react-native";

// const planData = [
//   {
//     feature: "OPD Consultations / Mo",
//     tiers: ["2", "4", "6", "Unlimited"],
//   },
//   {
//     feature: "Follow-Up Visits (14 Days)",
//     tiers: ["1", "2", "3", "Unlimited"],
//   },
//   {
//     feature: "Diagnostics & Tests",
//     tiers: ["1 Lab / Mo", "2 Labs + 1 Scan", "4 Labs + 2 Scans", "Unlimited"],
//   },
//   {
//     feature: "Pharmacy Discount",
//     tiers: ["5%", "7.5%", "10%", "15%"],
//   },
//   {
//     feature: "Accidental Care Cap",
//     tiers: ["₹5K", "₹10K", "₹15K", "₹25K"],
//   },
//   {
//     feature: "Ambulance Access",
//     tiers: ["❌", "₹300 Off", "Free City", "Free + Pan City"],
//   },
//   {
//     feature: "Mental Health Teletherapy",
//     tiers: ["❌", "Add-on", "1 / Mo", "2 / Mo"],
//   },
//   {
//     feature: "Upgrade Option",
//     tiers: ["✅", "✅", "✅", "❌"],
//   },
// ];

// const tiers = ["Basic", "Plus", "Premium", "Super Premium"];

// const PlanComparisonScreen = () => {
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Plan Comparison</Text>
//       {planData.map((item, idx) => (
//         <View key={idx} style={styles.row}>
//           <Text style={styles.feature}>{item.feature}</Text>
//           <View style={styles.tierRow}>
//             {item.tiers.map((val, i) => (
//               <View key={i} style={styles.tierBox}>
//                 <Text style={styles.tierLabel}>{tiers[i]}</Text>
//                 <Text style={styles.tierValue}>{val}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   row: {
//     marginBottom: 24,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     paddingBottom: 8,
//   },
//   feature: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   tierRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   tierBox: {
//     flex: 1,
//     marginHorizontal: 4,
//     backgroundColor: "#f2f2f2",
//     padding: 8,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   tierLabel: {
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   tierValue: {
//     fontSize: 14,
//   },
// });

// export default PlanComparisonScreen;
  import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';

const PlanComparison = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/plans")
      .then((res) => setPlans(res.data))
      .catch((err) => console.error("Failed to fetch plans", err));
  }, []);

  const allFeatures = Array.from(new Set(plans.flatMap(p => p.features || [])));

  return (
    <ScrollView horizontal style={{ padding: 10 }}>
      <View style={styles.column}>
        <Text style={styles.header}>Features</Text>
        {allFeatures.map((f, idx) => (
          <Text key={idx} style={styles.cell}>{f}</Text>
        ))}
        <Text style={styles.cell}>Price</Text>
      </View>
      {plans.map((plan, idx) => (
        <View key={idx} style={styles.column}>
          <Text style={styles.header}>{plan.name}</Text>
          {allFeatures.map((f, i) => (
            <Text key={i} style={styles.cell}>
              {plan.features.includes(f) ? "✅" : "❌"}
            </Text>
          ))}
          <Text style={styles.cell}>₹ {plan.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  column: { marginRight: 16 },
  header: { fontWeight: 'bold', marginBottom: 8 },
  cell: { paddingVertical: 4 },
});

export default PlanComparison;
