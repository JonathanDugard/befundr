export class Metadata<T> {
    private uri: string;
    private data: T | null = null;
  
    constructor(uri: string) {
      this.uri = uri;
      this.initialize();
    }
  
    private async initialize(): Promise<void> {
      await this.fetch();
    }
  
    async fetch(): Promise<void> {
      try {
        console.log("Read metadata from Firebase");
        // const response = await fetch(this.uri);
        // if (!response.ok) {
        //   throw new Error("Failed to fetch metadata");
        // }
        // this.data = await response.json();
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    }
  
    async update(newData: T): Promise<void> {
      try {
        console.log("update metadata to Firebase")
        // const response = await fetch(this.uri, {
        //   method: "PUT", // or "POST" depending on your backend setup
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(newData),
        // }).catch(err => {
        //     throw new Error(err);
        // });
        // this.data = newData;
      } catch (error) {
        console.error("Error updating metadata:", error);
      }
    }
  
    getId(): string {
      return this.uri.split('/').pop() || '';
    }
  
    getUri(): string {
      return this.uri;
    }
  
    getData(): T | null {
      return this.data;
    }
}