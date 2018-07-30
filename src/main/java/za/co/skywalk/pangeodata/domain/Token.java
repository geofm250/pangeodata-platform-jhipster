package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Token.
 */
@Document(collection = "token")
public class Token implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("created_at")
    private String createdAt;

    @Field("expired_at")
    private String expiredAt;

    @Field("user_id")
    private String userId;

    @Field("token")
    private String token;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public Token createdAt(String createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getExpiredAt() {
        return expiredAt;
    }

    public Token expiredAt(String expiredAt) {
        this.expiredAt = expiredAt;
        return this;
    }

    public void setExpiredAt(String expiredAt) {
        this.expiredAt = expiredAt;
    }

    public String getUserId() {
        return userId;
    }

    public Token userId(String userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public Token token(String token) {
        this.token = token;
        return this;
    }

    public void setToken(String token) {
        this.token = token;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Token token = (Token) o;
        if (token.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), token.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Token{" +
            "id=" + getId() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", expiredAt='" + getExpiredAt() + "'" +
            ", userId='" + getUserId() + "'" +
            ", token='" + getToken() + "'" +
            "}";
    }
}
