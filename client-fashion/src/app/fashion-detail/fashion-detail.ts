import { Component } from '@angular/core';
import { Fashion } from '../services/fashion';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css',
})
export class FashionDetail {
  fashion: Fashion | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private fashionService: Fashion,
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

  goBack(): void {
    this.router.navigate(['/']);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  filterByStyle(style: string): void {
    this.router.navigate(['/'], { queryParams: { style } });
  }
}
