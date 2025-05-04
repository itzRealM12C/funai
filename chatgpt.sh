#!/bin/bash

# ChatGPT Shell CLI Simulation Script
# Provides a simple interactive interface for ChatGPT-like interactions

# ANSI Color Codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to generate a simulated AI response
generate_response() {
    local input="$1"
    
    # Array of simulated response patterns
    local responses=(
        "Interesting thought! Let me help you with that."
        "Here's a creative interpretation of your query."
        "I'm processing your request with advanced AI capabilities."
        "Let's break down your message and explore its meaning."
        "Generating a comprehensive response for you..."
    )

    # Simple randomization of responses
    local response=${responses[$RANDOM % ${#responses[@]}]}
    
    echo -e "${GREEN}🤖 AI Response:${NC} $response"
    
    # Add some playful variation
    case $(echo "$input" | tr '[:upper:]' '[:lower:]') in
        *help*)
            echo -e "${BLUE}ℹ️ Available Commands:${NC}"
            echo "  - ask: Ask a question"
            echo "  - explain: Request an explanation"
            echo "  - help: Show this help menu"
            ;;
        *hello*)
            echo -e "${YELLOW}👋 Hello there! How can I assist you today?${NC}"
            ;;
        *bye*)
            echo -e "${RED}👋 Goodbye! Feel free to chat again anytime.${NC}"
            ;;
    esac
}

# Main interaction loop
main() {
    echo -e "${BLUE}🚀 ChatGPT Shell CLI Simulation${NC}"
    echo -e "Type your message or 'exit' to quit.\n"

    while true; do
        read -p "${YELLOW}You:${NC} " user_input
        
        # Exit condition
        if [[ "$user_input" == "exit" ]]; then
            echo -e "${RED}Exiting ChatGPT Shell CLI...${NC}"
            break
        fi

        # Generate and display response
        generate_response "$user_input"
        echo ""
    done
}

# Run the main function
main