import React, { useEffect, useState } from 'react';
import { View, Switch, Text, Button, Linking, Clipboard } from 'react-native';
import axios from 'axios';

const ProfileSharingScreen = () => {
  const [settings, setSettings] = useState({
    showName: true,
    showAge: false,
    showConditions: false,
    showAppointments: false,
  });

  const userId = '123456'; // replace with actual userId from auth context
  const shareLink = `https://yourdomain.com/shared-profile/${userId}`;

  useEffect(() => {
    axios
      .get('https://yourdomain.com/api/public-profile/settings')
      .then(res => {
        if (res.data) setSettings(res.data);
      });
  }, []);

  const saveSettings = () => {
    axios
      .post('https://yourdomain.com/api/public-profile/settings', settings)
      .then(() => alert('Saved!'));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
        What Do You Want to Share?
      </Text>

      {['showName', 'showAge', 'showConditions', 'showAppointments'].map(
        field => (
          <View
            key={field}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text>{field.replace('show', 'Show ')}</Text>
            <Switch
              value={settings[field]}
              onValueChange={() =>
                setSettings({ ...settings, [field]: !settings[field] })
              }
            />
          </View>
        ),
      )}

      <Button title="Save" onPress={saveSettings} />

      <Text style={{ marginTop: 20 }}>Share this link:</Text>
      <Text style={{ color: 'blue' }}>{shareLink}</Text>

      <Button
        title="Share via WhatsApp"
        onPress={() =>
          Linking.openURL(
            `https://wa.me/?text=Check my health profile: ${shareLink}`,
          )
        }
      />
      <Button
        title="Copy Link"
        onPress={() => Clipboard.setString(shareLink)}
      />
    </View>
  );
};

export default ProfileSharingScreen;
