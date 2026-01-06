namespace Domain.Configs
{
    public class ApiConfig
    {
        public string AllowedOrigin { get; set; } = null!;
        public string TokenIssuer { get; set; } = null!;
        public string TokenAudience { get; set; } = null!;
        public string ApiSecret { get; set; } = null!;
        public int AccessTokenExpirationMinutes { get; set; }
    }
}
