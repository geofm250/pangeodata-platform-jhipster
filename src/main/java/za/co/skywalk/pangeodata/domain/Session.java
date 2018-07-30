package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Session.
 */
@Document(collection = "session")
public class Session implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("user")
    private String user;

    @Field("password_token")
    private String passwordToken;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public Session user(String user) {
        this.user = user;
        return this;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPasswordToken() {
        return passwordToken;
    }

    public Session passwordToken(String passwordToken) {
        this.passwordToken = passwordToken;
        return this;
    }

    public void setPasswordToken(String passwordToken) {
        this.passwordToken = passwordToken;
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
        Session session = (Session) o;
        if (session.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), session.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Session{" +
            "id=" + getId() +
            ", user='" + getUser() + "'" +
            ", passwordToken='" + getPasswordToken() + "'" +
            "}";
    }
}
