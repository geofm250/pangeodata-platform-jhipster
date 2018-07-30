package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Product.
 */
@Document(collection = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("active")
    private String active;

    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @Field("turn_around_time")
    private String turnAroundTime;

    @Field("cost")
    private String cost;

    @Field("countries")
    private String countries;

    @Field("created_at")
    private String createdAt;

    @Field("updated_at")
    private String updatedAt;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getActive() {
        return active;
    }

    public Product active(String active) {
        this.active = active;
        return this;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTurnAroundTime() {
        return turnAroundTime;
    }

    public Product turnAroundTime(String turnAroundTime) {
        this.turnAroundTime = turnAroundTime;
        return this;
    }

    public void setTurnAroundTime(String turnAroundTime) {
        this.turnAroundTime = turnAroundTime;
    }

    public String getCost() {
        return cost;
    }

    public Product cost(String cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(String cost) {
        this.cost = cost;
    }

    public String getCountries() {
        return countries;
    }

    public Product countries(String countries) {
        this.countries = countries;
        return this;
    }

    public void setCountries(String countries) {
        this.countries = countries;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public Product createdAt(String createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public Product updatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
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
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", active='" + getActive() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", turnAroundTime='" + getTurnAroundTime() + "'" +
            ", cost='" + getCost() + "'" +
            ", countries='" + getCountries() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
