import { View, Text, TextInput, StyleSheet, Alert, Pressable, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ImagePicker from '@/Components/ImagePicker';
import LocationPicker from '@/Components/LocationPicker';
import { Place } from '@/types/place';
import { insertPlace } from '@/utility/database';
import { router } from 'expo-router';


const AddNewPlace = () => {
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = async () => {
    if (place) {
      console.log(place)
      if (!place?.address || !place?.description || !place?.imageUri || !place.lat || !place?.title) {
        Alert.alert(
          'Missing Information',
          'Please fill in all required fields to save your special place!',
          [{ text: 'OK', style: 'default' }]
        );
        return;
      }

      setIsLoading(true);
      try {
        const res = await insertPlace(place);
        Alert.alert(
          'Success! 🎉',
          'Your place has been saved successfully!',
          [
            {
              text: 'View Places',
              onPress: () => router.navigate('/'),
            }
          ]
        );
      } catch (error) {
        Alert.alert('Error', 'Failed to save place. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.safeArea}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerSubtitle}>Create New</Text>
            <Text style={styles.headerTitle}>Special Place</Text>
          </View>

          <View style={styles.headerIconContainer}>
            <LinearGradient
              colors={['#ff9a9e', '#fecfef']}
              style={styles.headerIcon}
            >
              <Ionicons name="add-circle" size={24} color="#fff" />
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>

      {/* Form Content */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formContainer}>

          {/* Title Input */}
          <View style={styles.inputSection}>
            <View style={styles.labelContainer}>
              <Ionicons name="location" size={20} color="#667eea" />
              <Text style={styles.label}>Place Name</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="What makes this place special?"
                placeholderTextColor="#a0aec0"
                onChangeText={(text) =>
                  setPlace((prev) => ({
                    ...prev,
                    title: text,
                  }))
                }
              />
            </View>
          </View>

          {/* Description Input */}
          <View style={styles.inputSection}>
            <View style={styles.labelContainer}>
              <Ionicons name="create" size={20} color="#667eea" />
              <Text style={styles.label}>Memory Description</Text>
            </View>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Share your story about this place..."
                placeholderTextColor="#a0aec0"
                onChangeText={(text) =>
                  setPlace((prev) => ({
                    ...prev,
                    description: text,
                  }))
                }
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Image Picker Section */}
          <View style={styles.pickerSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="camera" size={24} color="#667eea" />
              <Text style={styles.sectionTitle}>Add Photo</Text>
            </View>
            <View style={styles.pickerContainer}>
              <ImagePicker addImage={setPlace} />
            </View>
          </View>

          {/* Location Picker Section */}
          <View style={styles.pickerSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="map" size={24} color="#667eea" />
              <Text style={styles.sectionTitle}>Set Location</Text>
            </View>
            <View style={styles.pickerContainer}>
              <LocationPicker addLocation={setPlace} />
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleOnChange}
          style={styles.saveButton}
          disabled={isLoading}
        >
          <LinearGradient
            colors={isLoading ? ['#a0aec0', '#718096'] : ['#667eea', '#764ba2']}
            style={styles.saveButtonGradient}
          >
            {isLoading ? (
              <>
                <Ionicons name="hourglass" size={20} color="#fff" />
                <Text style={styles.saveButtonText}>Saving...</Text>
              </>
            ) : (
              <>
                <Ionicons name="heart" size={20} color="#fff" />
                <Text style={styles.saveButtonText}>Save Special Place</Text>
              </>
            )}
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

export default AddNewPlace;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },

  // Header Styles
  header: {
    paddingTop: 10,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  headerContent: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    fontWeight: '300',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerIconContainer: {
    width: 40,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  // Scroll Container
  scrollContainer: {
    flex: 1,
    marginTop: -15,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 30,
    paddingHorizontal: 20,
    minHeight: '100%',
  },

  // Input Styles
  inputSection: {
    marginBottom: 25,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginLeft: 8,
  },
  inputContainer: {
    backgroundColor: '#f7fafc',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },
  textAreaContainer: {
    minHeight: 120,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 16,
  },

  // Picker Sections
  pickerSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginLeft: 10,
  },
  pickerContainer: {
    backgroundColor: '#f7fafc',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  // Save Button
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  saveButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
});