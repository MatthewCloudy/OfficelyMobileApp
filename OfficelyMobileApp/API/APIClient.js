export class APIClient {
    constructor() {
      this.token = null;
      this.url = 'https://officely.azurewebsites.net/'
    }
  
    async login(username, password) {
      try {
        const response = await fetch(`${this.url}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
  
        const data = await response.json();
        this.token = data.jwttoken;
      } catch (error) {
        console.error('Login failed:', error.message);
        throw error;
      }
    }
  
    async logout()
    {
      try{     
        const response = await fetch(`${this.url}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          }
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.statusText}`);
        }
        return response;
      } catch (error) {
        console.error('Authenticated request failed:', error.message);
        throw error;
      }
    }

    async sendAuthenticatedRequest(url, method = 'GET', body = null) {
      if (!this.token) {
        console.error('User not authenticated');
        return null;
      }
  
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
          body: body ? JSON.stringify(body) : null,
        });
  
        if (!response.ok) {
          throw new Error(`Request failed: ${response.statusText}`);
        }
  
        //const data = await response.json();
        return response;
      } catch (error) {
        console.error('Authenticated request failed:', error.message);
        throw error;
      }
    }

    async uploadPhoto() {
      try {
        const uploadUrl = 'http://localhost:8080/offices/1/thumbnail'; // Replace with your upload endpoint
        
        let input = document.querySelector('input[type="file"]')

        const formData = new FormData();

        console.log(input.files[0])
        formData.append('file', input.files[0]);

        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${this.token}`,
          },
          body: formData
        });
  
        if (!response.ok) {
          throw new Error('Photo upload failed');
        }
  
        const data = await response.json();
        console.log('Photo upload successful:', data);
      } catch (error) {
        console.error('Error during photo upload:', error.message);
        throw error;
      }
    }
  }
