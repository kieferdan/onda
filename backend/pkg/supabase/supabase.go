package supabase

import (
	"github.com/supabase-community/supabase-go"
)

type Client struct {
	*supabase.Client
}

func NewClient(supabaseURL, supabaseKey string) *Client {
	client, err := supabase.NewClient(supabaseURL, supabaseKey, nil)
	if err != nil {
		panic(err)
	}
	return &Client{client}
}
