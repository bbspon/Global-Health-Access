import React, { useState } from 'react';
import {
  View, Text, ScrollView, Alert, Image, TouchableOpacity
} from 'react-native';
import {
  TextInput, Button, Card, Checkbox, Modal, IconButton
} from 'react-native-paper';

export default function UserFeedbackMobile() {
  const [step, setStep] = useState('prompt'); // prompt or profile
  const [emoji, setEmoji] = useState('');
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [anon, setAnon] = useState(false);
  const [reviews, setReviews] = useState([
    { id:'1', emoji:'😠', comment:'Overbilling', time:'2025‑07‑10', reply:null },
    { id:'2', emoji:'😊', comment:'Good service', time:'2025‑06‑22', reply:'Thanks!' },
  ]);

  const handleSubmit = () => {
    Alert.alert('Thank you! Feedback submitted.');
    setStep('profile');
  };

  return (
    <ScrollView contentContainerStyle={{ padding:16 }}>
      {step === 'prompt' && (
        <View>
          <Text style={{ fontSize:18, marginBottom:12 }}>Give Feedback</Text>
          <View style={{ flexDirection:'row', marginBottom:12 }}>
            {['😃','😐','😠'].map(e=>(
              <TouchableOpacity key={e} onPress={()=>setEmoji(e)} style={{ marginRight:8 }}>
                <Text style={{ fontSize:24 }}>{e}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            label="Category"
            value={category}
            mode="outlined"
            style={{ marginBottom:12 }}
            placeholder="Cleanliness, Billing..."
            onChangeText={setCategory}
          />
          <TextInput
            label="Comment"
            value={comment}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={{ marginBottom:12 }}
            onChangeText={setComment}
          />
          <Checkbox.Item
            label="Submit Anonymously"
            status={anon?'checked':'unchecked'}
            onPress={()=>setAnon(!anon)}
          />
          <Button mode="contained" onPress={handleSubmit} style={{ marginTop:12 }}>
            Submit Feedback
          </Button>
        </View>
      )}
      {step === 'profile' && (
        <View>
          <Text style={{ fontSize:18, marginBottom:12 }}>Reviews</Text>
          {reviews.map(r=>(
            <Card key={r.id} style={{ marginBottom:12 }}>
              <Card.Content>
                <Text style={{ fontSize:20 }}>{r.emoji}</Text>
                <Text>{r.comment}</Text>
                <Text style={{ color:'gray', fontSize:12 }}>{r.time}</Text>
                {r.reply && <Text style={{ marginTop:8, fontStyle:'italic' }}>Partner reply: {r.reply}</Text>}
              </Card.Content>
            </Card>
          ))}
          <Button mode="outlined" onPress={()=>setStep('prompt')}>
            Leave More Feedback
          </Button>
        </View>
      )}
    </ScrollView>
  );
}
