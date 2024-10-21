import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedIn: boolean = false

  login(): Promise<void> {
    // Implement actual login logic here
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isLoggedIn = true
        resolve()
      }, 1000)
    })
  }

  logout(): void {
    this.isLoggedIn = false
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn
  }
}