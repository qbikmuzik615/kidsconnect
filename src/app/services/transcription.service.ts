import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpeechRecognition } from 'nativescript-speech-recognition';

@Injectable({
  providedIn: 'root'
})
export class TranscriptionService {
  private speechRecognition: SpeechRecognition;
  private transcriptionSubject = new BehaviorSubject<string>('');

  constructor() {
    this.speechRecognition = new SpeechRecognition();
  }

  startTranscription() {
    this.speechRecognition.available().then(
      (available) => {
        if (available) {
          this.speechRecognition.startListening({
            locale: "en-US",
            onResult: (transcription: string) => {
              this.transcriptionSubject.next(transcription);
            },
            onError: (error: string) => {
              console.error('Speech recognition error:', error);
            }
          }).then(
            () => console.log("Started listening"),
            (error) => console.error("Failed to start listening", error)
          );
        } else {
          console.warn("Speech recognition not available");
        }
      }
    );
  }

  stopTranscription() {
    this.speechRecognition.stopListening().then(
      () => console.log("Stopped listening"),
      (error) => console.error("Failed to stop listening", error)
    );
  }

  getTranscription() {
    return this.transcriptionSubject.asObservable();
  }
}