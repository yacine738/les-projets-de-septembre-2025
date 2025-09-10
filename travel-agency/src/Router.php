<?php
namespace TravelAgency;

class Router {
    private $routes = [];
    
    public function get($path, $callback) {
        $this->routes['GET'][$path] = $callback;
    }
    
    public function post($path, $callback) {
        $this->routes['POST'][$path] = $callback;
    }
    
    public function dispatch($method, $uri) {
        // Remove trailing slash
        $uri = rtrim($uri, '/') ?: '/';
        
        if (isset($this->routes[$method][$uri])) {
            $this->executeCallback($this->routes[$method][$uri]);
            return;
        }
        
        // Check for dynamic routes
        foreach ($this->routes[$method] ?? [] as $route => $callback) {
            if ($this->matchRoute($route, $uri)) {
                $this->executeCallback($callback, $this->extractParams($route, $uri));
                return;
            }
        }
        
        // 404 Not Found
        http_response_code(404);
        echo "Page not found";
    }
    
    private function matchRoute($route, $uri) {
        $pattern = preg_replace('/\{[^}]+\}/', '([^/]+)', $route);
        $pattern = str_replace('/', '\/', $pattern);
        return preg_match('/^' . $pattern . '$/', $uri);
    }
    
    private function extractParams($route, $uri) {
        $params = [];
        $routeParts = explode('/', trim($route, '/'));
        $uriParts = explode('/', trim($uri, '/'));
        
        foreach ($routeParts as $index => $part) {
            if (preg_match('/\{([^}]+)\}/', $part, $matches)) {
                $params[$matches[1]] = $uriParts[$index] ?? null;
            }
        }
        
        return $params;
    }
    
    private function executeCallback($callback, $params = []) {
        if (is_array($callback)) {
            $class = $callback[0];
            $method = $callback[1];
            $controller = new $class();
            $controller->$method($params);
        } elseif (is_callable($callback)) {
            $callback($params);
        }
    }
}
