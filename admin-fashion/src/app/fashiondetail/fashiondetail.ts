import { Component } from '@angular/core';
import { Fashion, FashionService } from '../services/fashion';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fashiondetail',
  standalone: false,
  templateUrl: './fashiondetail.html',
  styleUrl: './fashiondetail.css',
})
export class Fashiondetail {
fashion: Fashion | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private fashionService: FashionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFashion(id);
    }
  }

  loadFashion(id: string): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.fashionService.getFashionById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.fashion = response.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading fashion:', error);
        this.errorMessage = 'Failed to load fashion details.';
        this.loading = false;
      }
    });
  }

  editFashion(): void {
    if (this.fashion && this.fashion._id) {
      this.router.navigate(['/fashion/edit', this.fashion._id]);
    }
  }

  deleteFashion(): void {
    if (this.fashion && this.fashion._id) {
      const confirmDelete = confirm(`Are you sure you want to delete "${this.fashion.title}"?`);
      
      if (confirmDelete) {
        this.fashionService.deleteFashion(this.fashion._id).subscribe({
          next: (response) => {
            if (response.success) {
              alert('Fashion deleted successfully!');
              this.router.navigate(['/']);
            }
          },
          error: (error) => {
            console.error('Error deleting fashion:', error);
            alert('Failed to delete fashion. Please try again.');
          }
        });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
