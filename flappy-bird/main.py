import pygame
import sys
import random
import math

# Initialize Pygame
pygame.init()

# Constants
SCREEN_WIDTH = 400
SCREEN_HEIGHT = 600
FPS = 60

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BLUE = (135, 206, 235)
GREEN = (34, 139, 34)
YELLOW = (255, 255, 0)
RED = (255, 0, 0)

class Bird:
    def __init__(self):
        self.x = 50
        self.y = SCREEN_HEIGHT // 2
        self.velocity = 0
        self.gravity = 0.8
        self.jump_strength = -12
        self.radius = 20
        
    def update(self):
        self.velocity += self.gravity
        self.y += self.velocity
        
        # Keep bird on screen
        if self.y < 0:
            self.y = 0
            self.velocity = 0
        elif self.y > SCREEN_HEIGHT - self.radius:
            self.y = SCREEN_HEIGHT - self.radius
            self.velocity = 0
            
    def jump(self):
        self.velocity = self.jump_strength
        
    def draw(self, screen):
        pygame.draw.circle(screen, YELLOW, (int(self.x), int(self.y)), self.radius)
        # Add simple eye
        pygame.draw.circle(screen, BLACK, (int(self.x + 8), int(self.y - 5)), 3)

class Pipe:
    def __init__(self, x):
        self.x = x
        self.gap_size = 150
        self.width = 60
        self.speed = 3
        self.gap_y = random.randint(100, SCREEN_HEIGHT - 100 - self.gap_size)
        self.passed = False
        
    def update(self):
        self.x -= self.speed
        
    def draw(self, screen):
        # Top pipe
        pygame.draw.rect(screen, GREEN, 
                        (self.x, 0, self.width, self.gap_y))
        # Bottom pipe
        pygame.draw.rect(screen, GREEN, 
                        (self.x, self.gap_y + self.gap_size, self.width, 
                         SCREEN_HEIGHT - self.gap_y - self.gap_size))
        
    def is_off_screen(self):
        return self.x + self.width < 0
        
    def collides_with(self, bird):
        # Check if bird collides with pipes
        if (bird.x + bird.radius > self.x and bird.x - bird.radius < self.x + self.width):
            if (bird.y - bird.radius < self.gap_y or 
                bird.y + bird.radius > self.gap_y + self.gap_size):
                return True
        return False

class Game:
    def __init__(self):
        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        pygame.display.set_caption("Flappy Bird")
        self.clock = pygame.time.Clock()
        self.font = pygame.font.Font(None, 36)
        self.reset_game()
        
    def reset_game(self):
        self.bird = Bird()
        self.pipes = []
        self.score = 0
        self.game_over = False
        self.pipe_timer = 0
        
    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    if self.game_over:
                        self.reset_game()
                    else:
                        self.bird.jump()
        return True
        
    def update(self):
        if not self.game_over:
            self.bird.update()
            
            # Add new pipes
            self.pipe_timer += 1
            if self.pipe_timer > 90:  # Add pipe every 1.5 seconds at 60 FPS
                self.pipes.append(Pipe(SCREEN_WIDTH))
                self.pipe_timer = 0
                
            # Update pipes
            for pipe in self.pipes[:]:
                pipe.update()
                if pipe.is_off_screen():
                    self.pipes.remove(pipe)
                    
                # Check for scoring
                if not pipe.passed and pipe.x + pipe.width < self.bird.x:
                    pipe.passed = True
                    self.score += 1
                    
                # Check collision
                if pipe.collides_with(self.bird):
                    self.game_over = True
                    
            # Check if bird hits ground or ceiling
            if self.bird.y >= SCREEN_HEIGHT - self.bird.radius or self.bird.y <= 0:
                self.game_over = True
                
    def draw(self):
        # Sky gradient background
        for y in range(SCREEN_HEIGHT):
            color_ratio = y / SCREEN_HEIGHT
            r = int(135 * (1 - color_ratio * 0.3))
            g = int(206 * (1 - color_ratio * 0.2))
            b = int(235)
            pygame.draw.line(self.screen, (r, g, b), (0, y), (SCREEN_WIDTH, y))
            
        # Draw pipes
        for pipe in self.pipes:
            pipe.draw(self.screen)
            
        # Draw bird
        self.bird.draw(self.screen)
        
        # Draw score
        score_text = self.font.render(f"Score: {self.score}", True, WHITE)
        self.screen.blit(score_text, (10, 10))
        
        # Draw game over screen
        if self.game_over:
            overlay = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))
            overlay.set_alpha(128)
            overlay.fill(BLACK)
            self.screen.blit(overlay, (0, 0))
            
            game_over_text = self.font.render("GAME OVER", True, WHITE)
            restart_text = self.font.render("Press SPACE to restart", True, WHITE)
            
            game_over_rect = game_over_text.get_rect(center=(SCREEN_WIDTH//2, SCREEN_HEIGHT//2 - 50))
            restart_rect = restart_text.get_rect(center=(SCREEN_WIDTH//2, SCREEN_HEIGHT//2 + 50))
            
            self.screen.blit(game_over_text, game_over_rect)
            self.screen.blit(restart_text, restart_rect)
            
        pygame.display.flip()
        
    def run(self):
        running = True
        while running:
            running = self.handle_events()
            self.update()
            self.draw()
            self.clock.tick(FPS)
            
        pygame.quit()
        sys.exit()

if __name__ == "__main__":
    game = Game()
    game.run()
