package supabase

import (
	"encoding/json"
	"fmt"

	"github.com/kieferdan/onda-backend/internal/models"
	"github.com/supabase-community/supabase-go"
)

type Client struct {
	client *supabase.Client
}

func NewClient(supabaseURL, supabaseKey string) *Client {
	client, err := supabase.NewClient(supabaseURL, supabaseKey, nil)
	if err != nil {
		panic(err)
	}
	return &Client{client: client}
}

func (c *Client) GetBeaches() ([]models.Beach, error) {
	var beaches []models.Beach
	res, _, err := c.client.From("beaches").Select("*", "", false).Execute()
	if err != nil {
		return nil, fmt.Errorf("error fetching beaches: %w", err)
	}

	err = json.Unmarshal(res, &beaches)
	if err != nil {
		return nil, fmt.Errorf("error unmarshaling beaches data: %w", err)
	}

	return beaches, nil
}

func (c *Client) GetNearbyBeaches(lat, lng float64, limit int) ([]models.Beach, error) {
	res := c.client.Rpc("nearby_beaches", "", map[string]interface{}{
		"user_lat":  lat,
		"user_lng":  lng,
		"limit_val": limit,
	})

	if res == "" {
		return nil, fmt.Errorf("error fetching nearby beaches: empty response")
	}

	var beaches []models.Beach
	err := json.Unmarshal([]byte(res), &beaches)
	if err != nil {
		return nil, fmt.Errorf("error unmarshaling nearby beaches data: %w", err)
	}

	return beaches, nil
}
